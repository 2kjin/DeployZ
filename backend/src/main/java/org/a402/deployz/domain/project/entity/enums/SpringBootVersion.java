package org.a402.deployz.domain.project.entity.enums;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public enum SpringBootVersion {
    MAVEN_3_9_1("Maven 3.9.1"),
    MAVEN_3_9_0("Maven 3.9.0"),
    MAVEN_3_8_8("Maven 3.8.8"),
    MAVEN_3_8_7("Maven 3.8.7"),
    MAVEN_3_8_4("Maven 3.8.4"),
    MAVEN_3_8_3("Maven 3.8.3"),
    MAVEN3_6_3("Maven 3.6.3"),
    MAVEN3_5_4("Maven 3.5.4"),
    MAVEN_3_3_9("Maven 3.3.9"),


    GRADLE8_1_1("Gradle 8.1.1"),
    GRADLE8_1("Gradle 8.1"),
    GRADLE8_0_1("Gradle 8.0.1"),
    GRADLE8_0("Gradle 8.0"),
    GRADLE7_6("Gradle 7.6"),
    GRADLE7_5_1("Gradle 7.5.1"),
    GRADLE7_5("Gradle 7.5"),
    GRADLE7_4_2("Gradle 7.4.2"),
    GRADLE7_4_1("Gradle 7.4.1"),

    GRADLE7_4("Gradle 7.4"),
    GRADLE7_3_3("Gradle 7.3.3"),
    GRADLE7_3_2("Gradle 7.3.2"),
    GRADLE7_3_1("Gradle 7.3.1"),
    GRADLE7_3("Gradle 7.3"),
    GRADLE7_2("Gradle 7.2"),
    GRADLE7_1_1("Gradle 7.1.1"),
    GRADLE7_1("Gradle 7.1"),
    GRADLE7_0_2("Gradle 7.0.2"),
    GRADLE7_0("Gradle 7.0"),

    GRADLE6_9_2("Gradle 6.9.2"),
    GRADLE6_9_1("Gradle 6.9.1"),
    GRADLE6_9("Gradle 6.9"),
    GRADLE6_8_3("Gradle 6.8.3"),
    GRADLE6_8_2("Gradle 6.8.2"),
    GRADLE6_8_1("Gradle 6.8.1"),
    GRADLE6_8("Gradle 6.8"),
    GRADLE6_7_1("Gradle 6.7.1"),
    GRADLE6_7("Gradle 6.7"),
    GRADLE6_6_1("Gradle 6.6.1"),
    GRADLE6_6("Gradle 6.6"),
    GRADLE6_5_1("Gradle 6.5.1"),
    GRADLE6_5("Gradle 6.5"),
    GRADLE6_4_1("Gradle 6.4.1"),
    GRADLE6_4("Gradle 6.4");

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
