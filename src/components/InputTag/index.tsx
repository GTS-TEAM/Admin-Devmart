import React, { useEffect, useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import { ITagInput } from 'shared/types';
import { v4 } from 'uuid';

interface Props {
   onTagChange?: (tags: ITagInput[]) => any;
}

const InputTag = ({ onTagChange }: Props) => {
   const [tags, setTags] = useState<ITagInput[]>([]);
   const [html, setHtml] = useState<string>('');

   useEffect(() => {
      onTagChange && onTagChange(tags);

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [tags]);

   return (
      <div className="vz-input w-full focus:outline-vz-input-focus-border focus:outline focus:outline-1  !h-[unset] flex items-center flex-wrap gap-2 focus-within:border-vz-input-focus-border ">
         {tags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
               {tags.map((tag) => (
                  <div
                     className="flex items-center rounded bg-vz-body-color p-2 w-fit"
                     key={tag.id}
                  >
                     <span className="mr-2">{tag.value}</span>
                     <span
                        className="cursor-pointer"
                        onClick={() => {
                           setTags((_tags) => {
                              return [..._tags].filter(
                                 (_tag) => _tag.id !== tag.id
                              );
                           });
                        }}
                     >
                        <IoIosClose className="w-4 h-4" />
                     </span>
                  </div>
               ))}
            </div>
         )}

         <input
            value={html}
            placeholder="Enter a tag"
            onKeyDown={(e) => {
               if (e.key === 'Enter') {
                  e.preventDefault();
                  if (html.trim().length === 0) {
                     return;
                  }
                  setTags((_tags) => {
                     return [
                        ..._tags,
                        {
                           id: v4(),
                           value: html,
                        },
                     ];
                  });
                  setHtml('');
               }
            }}
            onChange={(e) => {
               setHtml(e.target.value);
            }}
            className="w-full bg-transparent h-full focus:border-0 focus:outline-none text-vz-text-color-body"
         />
      </div>
   );
};

export default InputTag;
