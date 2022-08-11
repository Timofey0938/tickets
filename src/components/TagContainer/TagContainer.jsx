import React from 'react';
import Tag from '../Tag/Tag';
import styles from './TagContainer.module.css';

export default function TagContainer({ tags, deletePossibility, deleteTag, ...props }) {
  return (
    <div className={styles.tagContainer} {...props}>
      {
        tags.map(tag => (
          <Tag
            size='short'
            color={tag}
            isHoverable={deletePossibility}
            style={{ margin: '8px 0 0 8px' }}
            onClick={() => {
              if (deletePossibility) {
                deleteTag(tag);
              }
            }}
            key={tag}
          />
        ))
      }
    </div>
  );
}