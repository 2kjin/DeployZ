package org.a402.deployz.domain.member.repository;

import java.util.Optional;

import org.a402.deployz.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
	Optional<Member> findMemberByEmail(final String email);
	Optional<Member> findMemberByRegistrationIdAndEmail(final String registrationId, final String email);
}
