package mangmae.gongnomok.controller.weapon;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.context.annotation.RequestScope;

@RequestMapping("/weapon")
@Controller
public class BowmanWeaponController {
    //배틀보우
    @GetMapping("/battle-bow")
    public String battleBow() {
        return "item/weapon/bowman/battle-bow";
    }

    //라이덴
    @GetMapping("/ryden")
    public String vaulter() {
        return "item/weapon/bowman/ryden";
    }

    //발터2000
    @GetMapping("/vaulter")
    public String vaulter2000() {
        return "item/weapon/bowman/vaulter";
    }

    //올림푸스
    @GetMapping("/olympus")
    public String olyumpus() {
        return "item/weapon/bowman/olympus";
    }

    //골든힌켈
    @GetMapping("/golden-hinkel")
    public String goldenHinkel() {
        return "item/weapon/bowman/golden-hinkel";
    }

    //헤클러
    @GetMapping("/heckler")
    public String heckler() {
        return "item/weapon/bowman/heckler";
    }

    //로우어
    @GetMapping("/rower")
    public String rower() {
        return "item/weapon/bowman/rower";
    }

    //골든 크로우
    @GetMapping("/golden-crow")
    public String goldenCrow() {
        return "item/weapon/bowman/golden-crow";
    }
}
