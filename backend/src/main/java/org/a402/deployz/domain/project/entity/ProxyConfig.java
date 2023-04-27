package org.a402.deployz.domain.project.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

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

    @Builder
    public ProxyConfig(final Long idx, final NginxConfig nginxConfig, final String pathUrl, final String pathName) {
        this.idx = idx;
        this.nginxConfig = nginxConfig;
        this.pathUrl = pathUrl;
        this.pathName = pathName;
    }
}
