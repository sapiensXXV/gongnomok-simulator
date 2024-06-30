package site.gongnomok.data.banword.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QBanWord is a Querydsl query type for BanWord
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QBanWord extends EntityPathBase<BanWord> {

    private static final long serialVersionUID = 247923962L;

    public static final QBanWord banWord = new QBanWord("banWord");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath word = createString("word");

    public QBanWord(String variable) {
        super(BanWord.class, forVariable(variable));
    }

    public QBanWord(Path<? extends BanWord> path) {
        super(path.getType(), path.getMetadata());
    }

    public QBanWord(PathMetadata metadata) {
        super(BanWord.class, metadata);
    }

}

