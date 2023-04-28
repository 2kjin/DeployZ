package org.a402.deployz.domain.project.entity.enums;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public enum SpringBootVersion {
    MAVEN_3_8_4("Maven 3.8.4"),
    MAVEN_3_8_3("Maven 3.8.3"),
    MAVEN3_6_3("Maven 3.6.3"),
    MAVEN3_5_4("Maven 3.5.4"),
    MAVEN_3_3_9("Maven 3.3.9"),


    GRADLE7_3("Gradle 7.3"),
    GRADLE7_2("Gradle 7.2"),
    GRADLE7_1_1("Gradle 7.1.1"),
    GRADLE7_0_2("Gradle 7.0.2"),
    GRADLE6_9_1("Gradle 6.9.1"),
    GRADLE6_8_3("Gradle 6.8.3"),
    GRADLE6_7_1("Gradle 6.7.1");

    private final String name;

    SpringBootVersion(String name) {
        this.name = name;
    }
    public String getName() {
        return this.name;
    }


    public static List<String> getSpringBootVersion() {
        return Arrays.stream(SpringBootVersion.values())
                .map(SpringBootVersion::getName)
                .collect(Collectors.toList());
    }

}
