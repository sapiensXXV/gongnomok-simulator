package site.gongnomok.management.dto.request;


import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class CommentReportListDeleteRequest {

    private final CommentReportIdList reports;
}
