package site.gongnomok.core.converter;

import org.springframework.stereotype.Component;
import site.gongnomok.common.banword.dto.BanWordDto;
import site.gongnomok.data.banword.domain.BanWord;

import java.util.List;

@Component
public class BanWordConverter {

    public BanWordDto toDto(BanWord banWord) {
        return new BanWordDto(banWord.getId(), banWord.getWord());
    }

    public List<BanWordDto> toDtoList(List<BanWord> banWords) {
        return banWords.stream()
            .map(this::toDto)
            .toList();
    }

}
