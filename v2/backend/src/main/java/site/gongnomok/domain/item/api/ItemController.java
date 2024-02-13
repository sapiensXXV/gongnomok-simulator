package site.gongnomok.domain.item.api;


import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;
import site.gongnomok.domain.member.dto.MemberDto;
import site.gongnomok.global.MemberConst;
import site.gongnomok.global.entity.enumerate.Role;

import static site.gongnomok.global.entity.enumerate.Role.USER;

@CrossOrigin
@RestController
@RequiredArgsConstructor
public class ItemController {

    @GetMapping("/item/new")
    public ResponseEntity<Void> newItem(
        @SessionAttribute(value = MemberConst.loginMember, required = false) MemberDto member
    ) {
        if (member == null) {
            return ResponseEntity.status(401).build();
        }
        if (member.getRole().equals(USER.makeLowerString())) {
            return ResponseEntity.status(403).build();
        }
        return ResponseEntity.ok().build();
    }

}
