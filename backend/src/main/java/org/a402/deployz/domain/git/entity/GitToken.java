package org.a402.deployz.domain.git.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.ColumnDefault;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "git_token")
public class GitToken {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "idx", nullable = false)
  private Long idx;
  @Column(name = "branch_name", length = 50)
  private String branchName;
  @Column(name = "secret_token", length = 200)
  private String secretToken;
  @ColumnDefault("false")
  @Column(name = "deleted_flag", nullable = false)
  private boolean deletedFlag;
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "git_config_idx")
  private GitConfig gitConfig;

  public void updateDeletedFlag() {
    this.deletedFlag = true;
  }

  @Builder
  public GitToken(final Long idx, final String branchName, final String secretToken,
      final boolean deletedFlag, final GitConfig gitConfig) {
    this.idx = idx;
    this.branchName = branchName;
    this.secretToken = secretToken;
    this.deletedFlag = deletedFlag;
    this.gitConfig = gitConfig;
  }

}
