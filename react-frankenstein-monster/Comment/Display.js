import {useCallback} from 'react';
import styled from 'styled-components';
import React  from 'react';

const Text = styled.div`
`;

const Footer = styled.footer`
    display: flex;
    align-items: center;
    justify-content: flex-end;;
    gap: 8px;
    margin-top: 12px;
`;

export default function CommentDisplay({commentId, content, time, onEdit, onDelete}) {
    const edit = useCallback(
        () => onEdit(commentId),
        [commentId, onEdit]
    );
    const remove = useCallback(
        () => onDelete(commentId),
        [commentId, onDelete]
    );

    return (
        <>
            <Text>
                {content}
            </Text>
            <Footer>
                <time>{time.toLocaleDateString()} {time.toLocaleTimeString()}</time>
                <a onClick={edit}>edit</a>
                <a onClick={remove}>delete</a>
            </Footer>
        </>
    );
}
