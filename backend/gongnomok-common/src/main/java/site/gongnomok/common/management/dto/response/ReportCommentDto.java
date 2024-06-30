package site.gongnomok.common.management.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ReportCommentDto {

    private Long reportId;
    private Long commentId;
    private String name;
    private LocalDateTime createdDate;
    private String content;
    private int count;

}
