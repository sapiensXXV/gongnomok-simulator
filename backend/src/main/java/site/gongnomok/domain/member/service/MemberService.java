package site.gongnomok.domain.member.service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import site.gongnomok.domain.exception.CannotFindMemberException;
import site.gongnomok.domain.member.dto.MemberDto;
import site.gongnomok.domain.member.repository.MemberRepository;
import site.gongnomok.domain.member.service.dto.MemberLoginServiceDto;
import site.gongnomok.global.entity.Member;
import site.gongnomok.global.util.SecurityUtil;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    public MemberDto findMember(final MemberLoginServiceDto dto) {
        String id = dto.getId();
        String encryptedPassword = SecurityUtil.encryptSha256(dto.getPassword());

        Optional<Member> member = memberRepository.findMember(id, encryptedPassword);
        Member findedMember = member.orElseThrow(() -> new CannotFindMemberException("회원을 찾을 수 없습니다."));
        return MemberDto.builder()
            .role(findedMember.getRole().makeLowerString())
            .id(findedMember.getId())
            .name(findedMember.getName())
            .build();
    }



}
