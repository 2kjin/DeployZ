package org.a402.deployz.domain.project.entity;

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
@Table(name = "proxy_config")
public class ProxyConfig {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "idx", nullable = false)
  private Long idx;
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "nginx_config_idx")
  private NginxConfig nginxConfig;
  @Column(name = "path_url", length = 50)
  private String pathUrl;
  @Column(name = "path_name", length = 50)
  private String pathName;
  @ColumnDefault("false")
  @Column(name = "deleted_flag", nullable = false)
  private boolean deletedFlag;

  @Builder
  public ProxyConfig(final Long idx, final NginxConfig nginxConfig, final String pathUrl,
      final String pathName, final boolean deletedFlag) {
    this.idx = idx;
    this.nginxConfig = nginxConfig;
    this.pathUrl = pathUrl;
    this.pathName = pathName;
    this.deletedFlag = deletedFlag;
  }

}
