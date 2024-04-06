package site.gongnomok.member.service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.gongnomok.member.exception.CannotFindMemberException;
import site.gongnomok.member.dto.request.MemberDto;
import site.gongnomok.member.domain.repository.MemberRepository;
import site.gongnomok.member.dto.request.MemberLoginServiceDto;
import site.gongnomok.member.domain.Member;
import site.gongnomok.global.util.SecurityUtil;

import java.util.Optional;

@Slf4j
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
        return MemberDto.from(findedMember);
    }
}
