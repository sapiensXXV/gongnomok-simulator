package mangmae.gongnomok.controller.accessory;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/accessory")
public class AccessoryController {

    //홀리 크로스링
    @GetMapping("/holy-cross-earring")
    public String holyCrossRing() {
        return "item/accessory/holy-cross-earring-select";
    }

    @GetMapping("/holy-cross-earring-health")
    public String holyCrossRingHealth() {
        return "item/accessory/holy-cross-earring-hp";
    }

    @GetMapping("/holy-cross-earring-swift")
    public String holyCrossRingSwift() {
        return "item/accessory/holy-cross-earring-dex";
    }

    @GetMapping("/holy-cross-earring-intel")
    public String holyCrossRingIntel() {
        return "item/accessory/holy-cross-earring-int";
    }

    @GetMapping("/holy-cross-earring-lucky")
    public String holyCrossRingLucky() {
        return "item/accessory/holy-cross-earring-luk";
    }

}
