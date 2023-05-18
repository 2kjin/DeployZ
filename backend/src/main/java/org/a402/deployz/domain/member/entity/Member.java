package org.a402.deployz.domain.member.entity;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import org.a402.deployz.domain.project.entity.Project;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Member implements UserDetails {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(nullable = false)
	private Long idx;
	@ColumnDefault("false")
	@Column
	private boolean deletedFlag;
	@Column(length = 30)
	private String account;
	@Column(length = 100)
	private String password;
	@Column(length = 100)
	private String profileImage;
	@Column(length = 100)
	private String personalAccessToken;
	@OneToMany(mappedBy = "member", orphanRemoval = true, fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
	private List<Project> projects = new ArrayList<>();

	@Builder
	public Member(final Long idx, final boolean deletedFlag, final String account, final String password,
		final String profileImage,
		final String personalAccessToken, final List<Project> projects) {
		this.idx = idx;
		this.deletedFlag = deletedFlag;
		this.account = account;
		this.password = password;
		this.profileImage = profileImage;
		this.personalAccessToken = personalAccessToken;
		this.projects = projects;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return Stream.of("ROLE_USER")
			.map(SimpleGrantedAuthority::new)
			.collect(Collectors.toList());
	}

	public void encodePassword(final PasswordEncoder passwordEncoder) {
		this.password = passwordEncoder.encode(password);
	}

	public void updatePersonalAccessToken(final String personalAccessToken) {
		this.personalAccessToken = personalAccessToken;
	}

	@Override
	public String getUsername() {
		return this.account;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

}
