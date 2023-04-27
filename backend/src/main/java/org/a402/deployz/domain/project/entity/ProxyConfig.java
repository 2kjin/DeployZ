package org.a402.deployz.domain.project.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.a402.deployz.domain.git.entity.GitConfig;
import org.a402.deployz.domain.member.entity.Member;
import org.a402.deployz.domain.project.entity.Item;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "proxy_config")
public class ProxyConfig {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "idx", nullable = false)
    private Long idx;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nginx_config_idx")
    private NginxConfig nginxConfig;
    @Column(name = "path_url", length = 50)
    private String pathUrl;
    @Column(name = "path_name", length = 50)
    private String pathName;

    @Builder
    public ProxyConfig(final Long idx, final NginxConfig nginxConfig, final String pathUrl, final String pathName) {
        this.idx = idx;
        this.nginxConfig = nginxConfig;
        this.pathUrl = pathUrl;
        this.pathName = pathName;
    }
}
