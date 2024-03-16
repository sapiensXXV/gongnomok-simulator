package site.gongnomok.comment.dto.request;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class CommentCreateServiceDto {

    private String name;
    private String password;
    private String content;

}
