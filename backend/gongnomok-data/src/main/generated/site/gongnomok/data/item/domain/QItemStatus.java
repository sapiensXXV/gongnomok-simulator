package site.gongnomok.data.item.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QItemStatus is a Querydsl query type for ItemStatus
 */
@Generated("com.querydsl.codegen.DefaultEmbeddableSerializer")
public class QItemStatus extends BeanPath<ItemStatus> {

    private static final long serialVersionUID = 684000234L;

    public static final QItemStatus itemStatus = new QItemStatus("itemStatus");

    public final SimplePath<ItemStatusRange> acc = createSimple("acc", ItemStatusRange.class);

    public final SimplePath<ItemStatusRange> avo = createSimple("avo", ItemStatusRange.class);

    public final SimplePath<ItemStatusRange> dex = createSimple("dex", ItemStatusRange.class);

    public final SimplePath<ItemStatusRange> hp = createSimple("hp", ItemStatusRange.class);

    public final SimplePath<ItemStatusRange> intel = createSimple("intel", ItemStatusRange.class);

    public final SimplePath<ItemStatusRange> jump = createSimple("jump", ItemStatusRange.class);

    public final SimplePath<ItemStatusRange> luk = createSimple("luk", ItemStatusRange.class);

    public final SimplePath<ItemStatusRange> mgAtk = createSimple("mgAtk", ItemStatusRange.class);

    public final SimplePath<ItemStatusRange> mgDef = createSimple("mgDef", ItemStatusRange.class);

    public final SimplePath<ItemStatusRange> move = createSimple("move", ItemStatusRange.class);

    public final SimplePath<ItemStatusRange> mp = createSimple("mp", ItemStatusRange.class);

    public final SimplePath<ItemStatusRange> phyAtk = createSimple("phyAtk", ItemStatusRange.class);

    public final SimplePath<ItemStatusRange> phyDef = createSimple("phyDef", ItemStatusRange.class);

    public final SimplePath<ItemStatusRange> str = createSimple("str", ItemStatusRange.class);

    public QItemStatus(String variable) {
        super(ItemStatus.class, forVariable(variable));
    }

    public QItemStatus(Path<? extends ItemStatus> path) {
        super(path.getType(), path.getMetadata());
    }

    public QItemStatus(PathMetadata metadata) {
        super(ItemStatus.class, metadata);
    }

}

