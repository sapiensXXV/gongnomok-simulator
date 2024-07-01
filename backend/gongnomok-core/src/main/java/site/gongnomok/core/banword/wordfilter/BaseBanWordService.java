package site.gongnomok.core.banword.wordfilter;


import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import site.gongnomok.common.banword.dto.BanWordDto;
import site.gongnomok.common.banword.dto.response.PaginatedBanWordResponse;
import site.gongnomok.core.banword.BanWordService;
import site.gongnomok.core.converter.BanWordConverter;
import site.gongnomok.data.banword.domain.BanWord;
import site.gongnomok.data.banword.domain.repository.BanWordRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BaseBanWordService implements BanWordService {

    private final BanWordRepository banWordRepository;
    private final BanWordConverter banWordConverter;

    @Override
    public PaginatedBanWordResponse fetchBanWordList(Pageable pageable) {
        Page<BanWord> result = banWordRepository.findAll(pageable);
        List<BanWordDto> content = banWordConverter.toDtoList(result.getContent());

        return PaginatedBanWordResponse.builder()
            .words(content)
            .page(result.getNumber()+1) // pageable의 기본 페이지 넘버는 0부터 시작
            .size(result.getSize())
            .totalPage(result.getTotalPages())
            .totalElement(result.getTotalElements())
            .build();

    }

    @Override
    public void addBanWord(String word) {

    }

    @Override
    public void deleteBanWord(Long wordId) {

    }
}
