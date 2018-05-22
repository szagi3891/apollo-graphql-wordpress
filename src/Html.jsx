//@flow
import * as React from 'react';

type PropsType = {|
    title: string,
    index_src: string,
    html_content: string,
    data_init: string,
    ids: Array<string>,
    css: string,
|};

export const Html = (props: PropsType) => {
    const { title, index_src, html_content, data_init, ids, css } = props;

    return (
        <html>
            <head>
                <meta charSet="utf-8" />
                <title>{ title }</title>
                <style>{ css }</style>
            </head>
            <body>
                <div
                    id="root"
                    dangerouslySetInnerHTML={{__html: html_content}}
                    data-init={data_init}
                    data-ids={JSON.stringify(ids)}
                />
                <script src={index_src}></script>
            </body>
        </html>
    );
};
