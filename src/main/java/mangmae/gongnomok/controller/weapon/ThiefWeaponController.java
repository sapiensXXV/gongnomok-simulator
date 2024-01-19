package mangmae.gongnomok.controller.weapon;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/weapon")
public class ThiefWeaponController {

    //메바
    @GetMapping("/meba")
    public String meba() {
        return "item/weapon/thief/meba";
    }

    //다크 보닌
    @GetMapping("/dark-avarice")
    public String darkAvarice() {
        return "item/weapon/thief/dark-avarice";
    }

    //블러드 기간틱
    @GetMapping("/blood-gigantic")
    public String bloodGigantic() {
        return "item/weapon/thief/blood-gigantic";
    }

    //황갑충
    @GetMapping("/brown-scarab")
    public String brownScarab() {
        return "item/weapon/thief/brown-scarab";
    }

    //태극부채
    @GetMapping("/korean-pan")
    public String koreanPan() {
        return "item/weapon/thief/korean-pan";
    }

    //베즐러드
    @GetMapping("/bazlud")
    public String bezlud() {
        return "item/weapon/thief/bazlud";
    }

    //신기타
    @GetMapping("/shinkita")
    public String shinkita() {
        return "item/weapon/thief/shinkita";
    }

    //게타
    @GetMapping("/geta")
    public String geta() {
        return "item/weapon/thief/geta";
    }

    //용천권
    @GetMapping("/dragon-tail")
    public String dragonTail() {
        return "item/weapon/thief/dragon-tail";
    }

}
