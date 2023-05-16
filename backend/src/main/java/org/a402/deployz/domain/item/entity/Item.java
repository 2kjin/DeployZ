package org.a402.deployz.domain.item.entity;

import java.time.LocalDateTime;
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
import javax.persistence.Table;

import org.a402.deployz.domain.deploy.entity.Deploy;
import org.a402.deployz.domain.project.entity.Project;
import org.hibernate.annotations.ColumnDefault;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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
	@Column(name = "port_number")
	private Long portNumber;
	@Column(name = "branch_name", length = 50)
	private String branchName;
	@Column(name = "target_folder_path", length = 100)
	private String targetFolderPath;
	@Column(name = "framework_type", length = 100)
	private String frameworkType;
	@Column(name = "build_version", length = 50)
	private String buildVersion;
	@Column(name = "java_version", length = 10)
	private String javaVersion;
	@Column(name = "last_success_date")
	private LocalDateTime lastSuccessDate;
	@Column(name = "last_failure_date")
	private LocalDateTime lastFailureDate;
	@Column(name = "deleted_flag")
	@ColumnDefault("false")
	private boolean deletedFlag;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "project_idx")
	private Project project;
	@OneToMany(mappedBy = "item", orphanRemoval = true, fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
	private List<BuildHistory> itemHistories;
	@OneToMany(mappedBy = "item", orphanRemoval = true, fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
	private List<Deploy> deploys;

	@Builder
	public Item(final Long idx, final String name, final Long portNumber,
		final String branchName, final String targetFolderPath,
		final String frameworkType, final String buildVersion, final String javaVersion,
		final LocalDateTime lastSuccessDate,
		final LocalDateTime lastFailureDate, final boolean deletedFlag, final Project project,
		final List<BuildHistory> itemHistories,

		final List<Deploy> deploys) {
		this.idx = idx;
		this.name = name;
		this.branchName = branchName;
		this.targetFolderPath = targetFolderPath;
		this.frameworkType = frameworkType;
		this.buildVersion = buildVersion;
		this.javaVersion = javaVersion;
		this.lastSuccessDate = lastSuccessDate;
		this.lastFailureDate = lastFailureDate;
		this.deletedFlag = deletedFlag;
		this.project = project;
		this.itemHistories = itemHistories;
		this.deploys = deploys;
		this.portNumber=portNumber;
	}

	//deleted_flag 변경
	public void updateDeletedFlag() {
		this.deletedFlag = true;
	}
}
