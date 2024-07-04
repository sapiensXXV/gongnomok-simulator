package site.gongnomok.data.scroll.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QScroll is a Querydsl query type for Scroll
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QScroll extends EntityPathBase<Scroll> {

    private static final long serialVersionUID = 1569810700L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QScroll scroll = new QScroll("scroll");

    public final QScrollAbility ability;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath name = createString("name");

    public final NumberPath<Integer> probability = createNumber("probability", Integer.class);

    public QScroll(String variable) {
        this(Scroll.class, forVariable(variable), INITS);
    }

    public QScroll(Path<? extends Scroll> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QScroll(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QScroll(PathMetadata metadata, PathInits inits) {
        this(Scroll.class, metadata, inits);
    }

    public QScroll(Class<? extends Scroll> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.ability = inits.isInitialized("ability") ? new QScrollAbility(forProperty("ability")) : null;
    }

}

