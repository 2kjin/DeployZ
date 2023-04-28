package org.a402.deployz.domain.project.entity;

import java.time.LocalDateTime;
import java.util.List;
import javax.persistence.*;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "item")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idx", nullable = false)
    private Long idx;
    @Column(name = "name", length = 20)
    private String name;
    @Column(name = "port_number1")
    private Long portNumber1;
    @Column(name = "port_number2")
    private Long portNumber2;
    @Column(name = "branch_name", length = 50)
    private String branchName;
    @Column(name = "target_folder_path", length = 100)
    private String targetFolderPath;
    @Column(name = "framework_type", length = 100)
    private String frameworkType;
    @Column(name = "build_version", length = 50)
    private String buildVersion;
    @Column(name = "last_success_date")
    private LocalDateTime lastSuccessDate;
    @Column(name = "last_failure_date")
    private LocalDateTime lastFailureDate;
    @Column(name = "delete_flag")
    @ColumnDefault("false")
    private boolean deleteFlag;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_idx")
    private Project project;
    @OneToMany(mappedBy = "item", orphanRemoval = true, fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    private List<BuildHistory> itemHistories;
    @OneToMany(mappedBy = "item", orphanRemoval = true, fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    private List<ItemState> itemStates;

    @Builder
    public Item(final Long idx, final String name, final Long portNumber1, final Long portNumber2,
                final String branchName, final String targetFolderPath,
                final String frameworkType, final String buildVersion,
                final LocalDateTime lastSuccessDate,
                final LocalDateTime lastFailureDate, final boolean deleteFlag, final Project project,
                final List<BuildHistory> itemHistories,
                final List<ItemState> itemStates) {
        this.idx = idx;
        this.name = name;
        this.portNumber1 = portNumber1;
        this.portNumber2 = portNumber2;
        this.branchName = branchName;
        this.targetFolderPath = targetFolderPath;
        this.frameworkType = frameworkType;
        this.buildVersion = buildVersion;
        this.lastSuccessDate = lastSuccessDate;
        this.lastFailureDate = lastFailureDate;
        this.deleteFlag = deleteFlag;
        this.project = project;
        this.itemHistories = itemHistories;
        this.itemStates = itemStates;
    }

}
