package org.a402.deployz.domain.member.entity;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.a402.deployz.domain.project.entity.Project;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "member")
public class Member {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "idx", nullable = false)
  private Long idx;
  @Column(name = "deleted_flag")
  private boolean deletedFlag;
  @Column(name = "registration_id", length = 30)
  private String registrationId;
  @Column(name = "nickname", length = 50)
  private String nickname;
  @Column(name = "email", length = 100)
  private String email;
  @OneToMany(mappedBy = "member", orphanRemoval = true, fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
  private List<Project> projects = new ArrayList<>();

  @Builder
  public Member(final Long idx, final boolean deletedFlag, final String registrationId,
      final String nickname,
      final String email,
      final List<Project> projects) {
    this.idx = idx;
    this.deletedFlag = deletedFlag;
    this.registrationId = registrationId;
    this.nickname = nickname;
    this.email = email;
    this.projects = projects;
  }

}
