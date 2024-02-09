package mangmae.gongnomok.controller.armor;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/armor")
public class MagicianArmorController {

    // 다크세라피스
    @GetMapping("/dark-seraphis")
    public String darkSeraphis() {
        return "item/armor/dark-seraphis/dark-seraphis";
    }

    // 다크 아나카문
    @GetMapping("/dark-anakamoon")
    public String darkAnakamoon() {
        return "item/armor/dark-anakamoon/dark-anakamoon";
    }

}
