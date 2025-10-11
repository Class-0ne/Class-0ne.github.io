// 블로그 포스트 목록 (수동으로 관리)
const posts = [
    {
        title: "첫 번째 포스트",
        date: "2025-10-12",
        category: "일상",
        excerpt: "안녕하세요! 첫 번째 블로그 포스트입니다. 마크다운으로 간단하게 글을 작성할 수 있어요.",
        file: "2025-10-12-first-post.md"
    },
    {
        title: "블로그 시작",
        date: "2025-10-11",
        category: "공지",
        excerpt: "개인 블로그를 시작합니다. 개발 관련 글, 프로젝트 소개, 일상 이야기를 다룰 예정입니다.",
        file: "2025-10-11-welcome.md"
    }
];

// 날짜 순으로 정렬 (최신순)
posts.sort((a, b) => new Date(b.date) - new Date(a.date));

// 포스트 목록 렌더링
function renderPosts() {
    const postList = document.getElementById('post-list');

    if (posts.length === 0) {
        postList.innerHTML = '<div class="no-posts">아직 작성된 포스트가 없습니다.</div>';
        return;
    }

    postList.innerHTML = posts.map(post => `
        <article class="post-item">
            <h2><a href="post.html?file=${post.file}">${post.title}</a></h2>
            <div class="post-meta">
                <span>📅 ${post.date}</span>
                <span>📁 ${post.category}</span>
            </div>
            <p class="post-excerpt">${post.excerpt}</p>
            <a href="post.html?file=${post.file}" class="read-more">더 읽기</a>
        </article>
    `).join('');
}

// 페이지 로드 시 포스트 목록 렌더링
document.addEventListener('DOMContentLoaded', renderPosts);
