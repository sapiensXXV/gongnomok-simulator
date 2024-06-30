package site.gongnomok.api.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;
import site.gongnomok.common.member.constant.MemberConst;
import site.gongnomok.common.member.dto.request.MemberDto;
import site.gongnomok.core.auth.AdminAuth;
import site.gongnomok.core.auth.AdminOnly;
import site.gongnomok.core.auth.domain.Accessor;
import site.gongnomok.core.auth.dto.AdminConfirmResponse;
import site.gongnomok.core.auth.dto.AuthCheckResponse;
import site.gongnomok.data.member.Role;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AuthController {

    @GetMapping("/auth")
    public ResponseEntity<Void> auth(
        @SessionAttribute(value = MemberConst.loginMember, required = false) MemberDto member
    ) {
        if (member == null) {
            return ResponseEntity.status(401).build();
        }
        if (member.getRole().equals(Role.USER.name())) {
            return ResponseEntity.status(403).build();
        }

        return ResponseEntity.ok().build();
    }

    @GetMapping("/auth/admin")
    @AdminOnly
    public ResponseEntity<AdminConfirmResponse> authAdmin(@AdminAuth Accessor accessor) {
        return ResponseEntity.ok().body(new AdminConfirmResponse("admin confirm"));
    }

    @GetMapping("/auth/check")
    public ResponseEntity<AuthCheckResponse> checkSession(
        @SessionAttribute(value = MemberConst.loginMember, required = false) MemberDto member
    ) {
        if (member == null) {
            return ResponseEntity.ok(new AuthCheckResponse(Role.GUEST.name()));
        }
        return ResponseEntity.ok(new AuthCheckResponse(member.getRole()));
    }
}
