import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'
import tinymceApi from "../conf/conf"


const RTE = ({ name, label, control, defaultValue = "", labelClass = '' }) => {
  return (
    <div className='w-full'>
      {label && <label className={`inline-block mb-1 pl-1 ${labelClass}`}>{label}</label>}
      <Controller
        name={name || ""}
        control={control}
        defaultValue={defaultValue}
        render={
          ({ field: { onChange, value } }) => (
            <Editor
              apiKey={tinymceApi}
              value={value}
              onEditorChange={onChange}
              init={{

                height: 500,
                menubar: true,
                plugins: [
                  "advlist", "autolink", "lists", "link", "image", "charmap", "preview",
                  "anchor", "searchreplace", "visualblocks", "code", "fullscreen",
                  "insertdatetime", "media", "table", "help", "wordcount"
                ],
                toolbar:
                  "undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media | code preview fullscreen | removeformat | help",
                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
              }}

            />
          )
        }
      />
    </div>
  )
}

export default RTE;
