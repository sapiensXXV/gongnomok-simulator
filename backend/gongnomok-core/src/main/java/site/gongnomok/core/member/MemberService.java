package site.gongnomok.core.member;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.gongnomok.common.global.util.SecurityUtil;
import site.gongnomok.common.member.dto.request.MemberDto;
import site.gongnomok.common.member.dto.MemberLoginServiceDto;
import site.gongnomok.core.member.exception.CannotFindMemberException;
import site.gongnomok.data.member.Member;
import site.gongnomok.data.member.repository.MemberRepository;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    public MemberDto findMember(final MemberLoginServiceDto dto) {
        String id = dto.getId();
        String encryptedPassword = SecurityUtil.encryptSha256(dto.getPassword());

        Optional<Member> member = memberRepository.findMember(id, encryptedPassword);
        Member findedMember = member.orElseThrow(() -> new CannotFindMemberException("회원을 찾을 수 없습니다."));
        return findedMember.toDto();
    }
}
