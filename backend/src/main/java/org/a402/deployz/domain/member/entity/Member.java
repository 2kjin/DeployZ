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
import javax.persistence.Table;

import org.a402.deployz.domain.project.entity.Project;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "member")
public class Member implements UserDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idx", nullable = false)
	private Long idx;
	@Column(name = "deleted_flag")
	private boolean deletedFlag;
	@Column(name = "registration_id", length = 30)
	private String registrationId;
	@Column(name = "email", length = 100)
	private String email;
	@Column(name = "profile_image", length = 100)
	private String profileImage;
	@OneToMany(mappedBy = "member", orphanRemoval = true, fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
	private List<Project> projects = new ArrayList<>();

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return Stream.of("ROLE_USER")
			.map(SimpleGrantedAuthority::new)
			.collect(Collectors.toList());
	}

	@Builder
	public Member(final Long idx, final boolean deletedFlag, final String registrationId, final String email,
		final String profileImage, final List<Project> projects) {
		this.idx = idx;
		this.deletedFlag = deletedFlag;
		this.registrationId = registrationId;
		this.email = email;
		this.profileImage = profileImage;
		this.projects = projects;
	}

	@Override
	public String getPassword() {
		return null;
	}

	@Override
	public String getUsername() {
		return this.email;
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
