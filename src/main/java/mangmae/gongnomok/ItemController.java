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
        return "/item/armor/work-glove";
    }

    @GetMapping("/weapon/dark-avarice")
    public String darkAvarice() {
        return "/item/weapon/dark-avarice";
    }

    @GetMapping("/weapon/evil-wings")
    public String evilWings() {
        return "item/weapon/evil-wings";
    }

}
