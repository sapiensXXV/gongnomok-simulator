package site.gongnomok.domain.member.api;


import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.gongnomok.domain.member.dto.LoginDto;
import site.gongnomok.domain.member.dto.MemberDto;
import site.gongnomok.domain.member.service.MemberService;
import site.gongnomok.global.MemberConst;

@Slf4j
@CrossOrigin
@RestController
@RequestMapping
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<MemberDto> login(
        @RequestBody LoginDto loginDto,
        HttpServletRequest request
    ) {
        log.info("loginDto={}", loginDto);
        MemberDto member = memberService.findMember(loginDto.toServiceDto());
        HttpSession session = request.getSession();
        session.setAttribute(MemberConst.loginMember, member);

        log.info("login success");
        return ResponseEntity.ok().body(member);
    }

    @GetMapping("/test")
    public String test() {
        log.info("Test Method");
        return "ok";
    }

}
