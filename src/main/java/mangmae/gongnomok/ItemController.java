package mangmae.gongnomok;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping
@Controller
public class ItemController {

    /**
     * 노가다 목장갑
     */
    @GetMapping("/armor/work-glove")
    public String workGlove() {
        return "item/armor/work-glove";
    }

    /**
     * 파란색 가운(민첩)
     */
    @GetMapping("/armor/blue-robe-dex")
    public String blueRobeDex() {
        return "item/armor/blue-robe-dex";
    }

    /**
     * 파란색 가운(행운)
     */
    @GetMapping("/armor/blue-robe-luk")
    public String blueRobeLuk() {
        return "item/armor/blue-robe-luk";
    }

    /**
     * 파란색 가운(지능)
     */
    @GetMapping("/armor/blue-robe-int")
    public String blueRobeInt() {
        return "item/armor/blue-robe-int";
    }


    /**
     * 다크 보닌
     */
    @GetMapping("/weapon/dark-avarice")
    public String darkAvarice() {
        return "item/weapon/dark-avarice";
    }

    @GetMapping("/weapon/blood-gigantic")
    public String bloodGigantic() {
        return "item/weapon/blood-gigantic";
    }

    /**
     * 이블 윙즈
     */
    @GetMapping("/weapon/evil-wings")
    public String evilWings() {
        return "item/weapon/evil-wings";
    }

}
