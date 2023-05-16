package org.a402.deployz.domain.project.entity;

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
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.ColumnDefault;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "nginx_config")
public class NginxConfig {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idx", nullable = false)
    private Long idx;
    @OneToOne
    @JoinColumn(name = "project_idx")
    private Project project;
    @OneToMany(mappedBy = "nginxConfig", orphanRemoval = true, fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    private List<ProxyConfig> proxyConfigs = new ArrayList<>();
    @Column(name = "domain", length = 50)
    private String domain;
    @Column(name = "ssl_certificate", length = 100)
    private String sslCertificate;
    @Column(name = "ssl_certificate_key", length = 100)
    private String sslCertificateKey;
    @ColumnDefault("false")
    @Column(name = "deleted_flag", nullable = false)
    private boolean deletedFlag;

    @Builder
    public NginxConfig(final Long idx, final Project project, final List<ProxyConfig> proxyConfigs,
                   final String domain, final String sslCertificate, final String sslCertificateKey,
        final boolean deletedFlag) {
        this.idx = idx;
        this.project = project;
        this.proxyConfigs = proxyConfigs;
        this.domain = domain;
        this.sslCertificate = sslCertificate;
        this.sslCertificateKey = sslCertificateKey;
        this.deletedFlag = deletedFlag;
    }
}
