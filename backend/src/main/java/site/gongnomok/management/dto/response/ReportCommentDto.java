package site.gongnomok.management.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Builder
@Getter
public class ReportCommentDto {

    private final Long reportId;
    private final Long commentId;
    private final String name;
    private final LocalDateTime createdDate;
    private final String content;
    private final int count;

}
