import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const toolCategories = [
  {
    name: 'Filesystem',
    count: 12,
    color: '#00d1c1',
    tools: ['read_file', 'write_file', 'list_dir', 'delete_file', 'copy_file', 'move_file', 'create_dir', 'watch_path', 'file_exists', 'get_metadata', 'search_files', 'diff_files'],
    icon: '📁',
  },
  {
    name: 'Shell',
    count: 8,
    color: '#34d399',
    tools: ['run_command', 'run_script', 'spawn_process', 'kill_process', 'get_env', 'set_env', 'pipe_commands', 'background_job'],
    icon: '⚡',
  },
  {
    name: 'Git',
    count: 10,
    color: '#f59e0b',
    tools: ['git_clone', 'git_commit', 'git_push', 'git_pull', 'git_diff', 'git_log', 'git_branch', 'git_merge', 'git_stash', 'git_apply'],
    icon: '🔀',
  },
  {
    name: 'HTTP',
    count: 7,
    color: '#5b8fff',
    tools: ['http_get', 'http_post', 'http_put', 'http_delete', 'http_patch', 'download_file', 'upload_file'],
    icon: '🌐',
  },
  {
    name: 'Memory',
    count: 6,
    color: '#a78bfa',
    tools: ['store_memory', 'recall_memory', 'list_memories', 'delete_memory', 'search_memory', 'clear_context'],
    icon: '🧠',
  },
  {
    name: 'Secrets',
    count: 5,
    color: '#f87171',
    tools: ['get_secret', 'set_secret', 'list_secrets', 'delete_secret', 'rotate_secret'],
    icon: '🔐',
  },
  {
    name: 'Code',
    count: 9,
    color: '#fb923c',
    tools: ['parse_ast', 'format_code', 'lint_code', 'run_tests', 'build_project', 'install_deps', 'check_types', 'generate_docs', 'refactor'],
    icon: '💻',
  },
  {
    name: 'Data',
    count: 8,
    color: '#4ade80',
    tools: ['parse_json', 'parse_csv', 'parse_yaml', 'transform_data', 'validate_schema', 'query_db', 'export_data', 'import_data'],
    icon: '📊',
  },
  {
    name: 'Search',
    count: 5,
    color: '#38bdf8',
    tools: ['web_search', 'semantic_search', 'grep_files', 'find_symbol', 'index_codebase'],
    icon: '🔍',
  },
  {
    name: 'Comms',
    count: 5,
    color: '#e879f9',
    tools: ['send_email', 'send_webhook', 'post_slack', 'create_issue', 'notify'],
    icon: '📡',
  },
];

export default function ToolsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState(0);
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const heading = section.querySelector('.tools-heading');
      if (heading) {
        gsap.fromTo(heading,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
            scrollTrigger: { trigger: heading, start: 'top 80%' },
          }
        );
      }

      const cats = section.querySelectorAll('.tool-cat-btn');
      gsap.fromTo(cats,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: 'power3.out',
          scrollTrigger: { trigger: cats[0], start: 'top 85%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const cat = toolCategories[activeCategory];

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        background: '#F4F4F0',
        padding: '12rem 2rem',
        overflow: 'hidden',
        zIndex: 2,
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <span
              className="font-mono"
              style={{
                fontSize: '0.72rem',
                color: 'rgba(0,0,0,0.4)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '1.5rem',
              }}
            >
              Built-in Tooling
            </span>
            <h2
              className="tools-heading"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                fontWeight: 300,
                letterSpacing: '-0.02em',
                color: '#0a0a0a',
                lineHeight: 1.05,
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: 'italic',
                opacity: 0,
              }}
            >
              75 tools.<br />
              <span style={{ fontStyle: 'normal', color: 'rgba(0,0,0,0.4)' }}>14 categories.</span>
            </h2>
          </div>
          <p
            style={{
              fontSize: '1rem',
              lineHeight: 1.65,
              color: 'rgba(0,0,0,0.55)',
              maxWidth: '360px',
            }}
          >
            Every tool executes inside the agent's isolated sandbox via the agentd Unix socket. No tool can escape its container.
          </p>
        </div>

        {/* Category tabs */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            marginBottom: '3rem',
          }}
        >
          {toolCategories.map((c, i) => (
            <button
              key={i}
              className="tool-cat-btn"
              onClick={() => setActiveCategory(i)}
              style={{
                padding: '0.5rem 1.1rem',
                borderRadius: '999px',
                border: `1px solid ${activeCategory === i ? c.color : 'rgba(0,0,0,0.12)'}`,
                background: activeCategory === i ? `${c.color}15` : 'transparent',
                color: activeCategory === i ? c.color : 'rgba(0,0,0,0.55)',
                fontSize: '0.82rem',
                fontWeight: 400,
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                opacity: 0,
              }}
            >
              <span>{c.icon}</span>
              <span>{c.name}</span>
              <span
                className="font-mono"
                style={{
                  fontSize: '0.65rem',
                  color: activeCategory === i ? c.color : 'rgba(0,0,0,0.3)',
                  letterSpacing: '0.04em',
                }}
              >
                {c.count}
              </span>
            </button>
          ))}
        </div>

        {/* Tool grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '0.75rem',
          }}
        >
          {cat.tools.map((tool) => (
            <div
              key={tool}
              style={{
                padding: '1rem 1.25rem',
                borderRadius: '8px',
                border: `1px solid ${hoveredTool === tool ? cat.color : 'rgba(0,0,0,0.1)'}`,
                background: hoveredTool === tool ? `${cat.color}08` : 'rgba(255,255,255,0.7)',
                transition: 'all 0.2s ease',
                transform: hoveredTool === tool ? 'translateY(-2px)' : 'none',
                boxShadow: hoveredTool === tool ? `0 8px 24px ${cat.color}20` : 'none',
              }}
              onMouseEnter={() => setHoveredTool(tool)}
              onMouseLeave={() => setHoveredTool(null)}
            >
              <div
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: cat.color,
                  marginBottom: '0.75rem',
                  opacity: hoveredTool === tool ? 1 : 0.5,
                  transition: 'opacity 0.2s',
                }}
              />
              <span
                className="font-mono"
                style={{
                  fontSize: '0.78rem',
                  color: hoveredTool === tool ? 'rgba(0,0,0,0.85)' : 'rgba(0,0,0,0.55)',
                  letterSpacing: '0.02em',
                  transition: 'color 0.2s',
                }}
              >
                {tool}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            marginTop: '4rem',
            padding: '2rem',
            borderRadius: '12px',
            background: 'rgba(0,0,0,0.04)',
            border: '1px solid rgba(0,0,0,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <span
              style={{
                fontSize: '0.95rem',
                color: 'rgba(0,0,0,0.7)',
              }}
            >
              All tools invoked via JSON over Unix socket.
            </span>
            <span
              className="font-mono"
              style={{
                fontSize: '0.8rem',
                color: 'rgba(0,0,0,0.35)',
                marginLeft: '0.75rem',
              }}
            >
              /tmp/agentd.sock
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              gap: '1.5rem',
            }}
          >
            {['Filesystem', 'Shell', 'Git', 'HTTP'].map((tag) => (
              <span
                key={tag}
                className="font-mono"
                style={{
                  fontSize: '0.65rem',
                  color: 'rgba(0,0,0,0.3)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                {tag}
              </span>
            ))}
            <span
              className="font-mono"
              style={{
                fontSize: '0.65rem',
                color: 'rgba(0,0,0,0.3)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              +10 more
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
