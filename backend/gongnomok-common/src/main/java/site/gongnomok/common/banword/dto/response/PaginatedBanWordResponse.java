package site.gongnomok.common.banword.dto.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import site.gongnomok.common.banword.dto.BanWordDto;

import java.util.List;

@AllArgsConstructor
@Getter
@Builder
public class PaginatedBanWordResponse {
    private List<BanWordDto> words;
    private int page;
    private int size;
    private int totalPage;
    private long totalElement;
}
