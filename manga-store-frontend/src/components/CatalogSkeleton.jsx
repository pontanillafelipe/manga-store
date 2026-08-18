import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function CatalogSkeleton() {
  return Array.from({ length: 20 }).map((_, index) => (
    <div className="manga-card" key={index}>
      <Skeleton height={280} />

      <div className="manga-info">
        <Skeleton width={70} />

        <Skeleton height={22} count={2} />

        <Skeleton width={80} />

        <Skeleton height={40} borderRadius={10} />
      </div>
    </div>
  ));
}

export default CatalogSkeleton;
