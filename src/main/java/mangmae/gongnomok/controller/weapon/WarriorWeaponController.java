package mangmae.gongnomok.controller.weapon;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/weapon")
public class WarriorWeaponController {

    //하이랜더
    @GetMapping("/lion-heart")
    public String lionHeart() {
        return "item/weapon/warrior/lion-heart";
    }

    //호검
    @GetMapping("/lion-fang")
    public String lionFang() {
        return "item/weapon/warrior/lion-fang";
    }
    //나카마키
    @GetMapping("/nakamaki")
    public String nakamaki() {
        return "item/weapon/warrior/nakamaki";
    }

    //제코
    @GetMapping("/zeco-select")
    public String zeco() {
        return "item/weapon/warrior/zeco/zeco-select";
    }

    @GetMapping("/zeco-accurate")
    public String zecoSwift() {
        return "item/weapon/warrior/zeco/zeco-accurate";
    }

    @GetMapping("/zeco-strong")
    public String zecoStrong() {
        return "item/weapon/warrior/zeco/zeco-strong";
    }

    //구룡도
    @GetMapping("/nine-dragon")
    public String nineDragon() {
        return "item/weapon/warrior/nine-dragon";
    }

}
