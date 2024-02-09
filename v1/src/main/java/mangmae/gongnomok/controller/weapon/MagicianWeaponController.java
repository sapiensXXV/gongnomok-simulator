package mangmae.gongnomok.controller.weapon;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/weapon")
@Controller
public class MagicianWeaponController {

    //우드완드
    @GetMapping("/wooden-wand")
    public String woodenWand() {
        return "item/weapon/magician/wooden-wand";
    }

    // 아크 스태프
    @GetMapping("/arc-staff")
    public String arcStaff() {
        return "item/weapon/magician/arc-staff";
    }

    // 이블 윙즈
    @GetMapping("/evil-wings")
    public String evilWings() {
        return "item/weapon/magician/evil-wings";
    }

}
