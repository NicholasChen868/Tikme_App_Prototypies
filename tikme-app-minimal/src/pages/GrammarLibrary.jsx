import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GrammarLibrary.css';

const GrammarLibrary = () => {
    const navigate = useNavigate();

    const topics = {
        N5: [
            {
                id: 'n5-wa',
                title: 'は (WA) Particle',
                description: 'Giới thiệu chủ đề câu',
                pattern: '～は',
                route: '/grammar-n5-wa',
                status: 'available',
                steps: 8,
                duration: '30-40 phút'
            }
        ],
        N4: [
            {
                id: 'n4-kotonisuru',
                title: 'ことにする',
                description: 'Quyết định làm gì đó',
                pattern: '～ことにする',
                route: '/grammar-n4-kotonisuru',
                status: 'available',
                steps: 8,
                duration: '30-40 phút'
            }
        ]
    };

    return (
        <div className="grammar-library">
            {/* Header */}
            <header className="library-header">
                <button
                    className="back-btn"
                    onClick={() => navigate('/')}
                >
                    ← Trang chủ
                </button>
                <div className="header-content">
                    <h1>📚 Thư Viện Ngữ Pháp</h1>
                    <p>Học từ cơ bản đến nâng cao - JLPT N5 & N4</p>
                </div>
            </header>

            {/* N5 Section */}
            <section className="level-section n5">
                <div className="level-header">
                    <h2>🔵 JLPT N5 (CƠ BẢN)</h2>
                    <span className="level-badge">{topics.N5.length} bài</span>
                </div>
                <div className="topics-grid">
                    {topics.N5.map(topic => (
                        <TopicCard key={topic.id} topic={topic} navigate={navigate} />
                    ))}
                </div>
            </section>

            {/* N4 Section */}
            <section className="level-section n4">
                <div className="level-header">
                    <h2>🟢 JLPT N4 (TRUNG CẤP)</h2>
                    <span className="level-badge">{topics.N4.length} bài</span>
                </div>
                <div className="topics-grid">
                    {topics.N4.map(topic => (
                        <TopicCard key={topic.id} topic={topic} navigate={navigate} />
                    ))}
                </div>
            </section>
        </div>
    );
};

const TopicCard = ({ topic, navigate }) => {
    const isAvailable = topic.status === 'available';

    return (
        <div className={`topic-card ${isAvailable ? 'available' : 'coming'}`}>
            <div className="topic-pattern">{topic.pattern}</div>
            <h3>{topic.title}</h3>
            <p className="topic-description">{topic.description}</p>
            <div className="topic-meta">
                <span>📊 {topic.steps} bước học</span>
                <span>⏱️ {topic.duration}</span>
            </div>
            <button
                className="topic-btn"
                onClick={() => isAvailable && navigate(topic.route)}
                disabled={!isAvailable}
            >
                {isAvailable ? 'Bắt đầu học →' : '⏳ Sắp có'}
            </button>
        </div>
    );
};

export default GrammarLibrary;
