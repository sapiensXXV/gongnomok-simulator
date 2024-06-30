package site.gongnomok.api.member.presentation;


import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.gongnomok.common.member.constant.MemberConst;
import site.gongnomok.common.member.dto.request.LoginDto;
import site.gongnomok.common.member.dto.request.MemberDto;
import site.gongnomok.core.member.MemberService;

@Slf4j
@CrossOrigin
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<MemberDto> login(
        @RequestBody LoginDto loginDto,
        HttpServletRequest request
    ) {
        MemberDto member = memberService.findMember(loginDto.toServiceDto());
        HttpSession session = request.getSession();

        session.setAttribute(MemberConst.loginMember, member);
        return ResponseEntity.ok().body(member);
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(
        HttpServletRequest request
    ) {
        HttpSession session = request.getSession();

        if (session == null) {
            throw new RuntimeException("There are no sessions to expire.");
        }

        session.invalidate();
        return ResponseEntity.noContent().build();
    }


}
