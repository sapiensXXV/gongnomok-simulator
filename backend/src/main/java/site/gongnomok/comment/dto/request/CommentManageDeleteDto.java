package site.gongnomok.comment.dto.request;


import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CommentManageDeleteDto {

    private final CommentIdCollection commentIds;

}
