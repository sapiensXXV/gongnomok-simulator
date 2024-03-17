package site.gongnomok.global.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;
import site.gongnomok.enhanceditem.domain.EnhancedItem;


/**
 * QEnhancedItem is a Querydsl query type for EnhancedItem
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QEnhancedItem extends EntityPathBase<EnhancedItem> {

    private static final long serialVersionUID = 1140828183L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QEnhancedItem enhancedItem = new QEnhancedItem("enhancedItem");

    public final NumberPath<Integer> acc = createNumber("acc", Integer.class);

    public final NumberPath<Integer> avo = createNumber("avo", Integer.class);

    public final NumberPath<Integer> dex = createNumber("dex", Integer.class);

    public final NumberPath<Integer> hp = createNumber("hp", Integer.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Integer> iev = createNumber("iev", Integer.class);

    public final NumberPath<Integer> intel = createNumber("intel", Integer.class);

    public final QItem item;

    public final NumberPath<Integer> jump = createNumber("jump", Integer.class);

    public final NumberPath<Integer> luk = createNumber("luk", Integer.class);

    public final NumberPath<Integer> mgAtk = createNumber("mgAtk", Integer.class);

    public final NumberPath<Integer> mgDef = createNumber("mgDef", Integer.class);

    public final NumberPath<Integer> move = createNumber("move", Integer.class);

    public final NumberPath<Integer> mp = createNumber("mp", Integer.class);

    public final StringPath name = createString("name");

    public final NumberPath<Integer> phyAtk = createNumber("phyAtk", Integer.class);

    public final NumberPath<Integer> phyDef = createNumber("phyDef", Integer.class);

    public final NumberPath<Integer> str = createNumber("str", Integer.class);

    public final NumberPath<Integer> successCount = createNumber("successCount", Integer.class);

    public QEnhancedItem(String variable) {
        this(EnhancedItem.class, forVariable(variable), INITS);
    }

    public QEnhancedItem(Path<? extends EnhancedItem> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QEnhancedItem(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QEnhancedItem(PathMetadata metadata, PathInits inits) {
        this(EnhancedItem.class, metadata, inits);
    }

    public QEnhancedItem(Class<? extends EnhancedItem> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.item = inits.isInitialized("item") ? new QItem(forProperty("item")) : null;
    }

}

