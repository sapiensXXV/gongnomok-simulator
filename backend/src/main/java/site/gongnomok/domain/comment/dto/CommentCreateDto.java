package site.gongnomok.domain.comment.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
public class CommentCreateDto {

    private String name;
    private String password;
    private String content;

    public CommentCreateServiceDto toServiceDto() {
        return CommentCreateServiceDto.builder()
            .name(name)
            .password(password)
            .content(content)
            .build();
    }

}
