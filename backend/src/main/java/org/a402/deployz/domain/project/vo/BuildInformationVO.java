package org.a402.deployz.domain.project.vo;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class BuildInformationVO {
	private String status;
	private LocalDateTime registerTime;
}
