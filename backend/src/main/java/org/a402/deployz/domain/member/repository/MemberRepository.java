package org.a402.deployz.domain.member.repository;

import org.a402.deployz.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

  Member findMemberByEmail(final String email);
}
