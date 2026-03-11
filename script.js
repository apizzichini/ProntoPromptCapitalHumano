document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');
    const resultSection = document.getElementById('result-section');
    const promptOutput = document.getElementById('prompt-output');
    const magicFillBtn = document.getElementById('magic-fill');

    let isTyping = false;

    const typeWriter = (text, element, speed = 5, callback = null) => {
        isTyping = true;
        element.textContent = '';
        element.classList.add('typing');
        let i = 0;

        function type() {
            if (i < text.length) {
                // Append 3 characters at a time for faster/smoother "AI-like" flow
                const chunk = text.substring(i, i + 3);
                element.textContent += chunk;
                i += 3;
                setTimeout(type, speed);
                element.scrollTop = element.scrollHeight;
            } else {
                element.classList.remove('typing');
                isTyping = false;
                if (callback) callback();
            }
        }
        type();
    };

    // Categorization Data - EXTENDED INSTITUTIONAL MAPPING
    const thematicAreas = {
        'promocion-humana': ['Habilidades para aprender', 'Alfabetización digital', 'Inteligencia artificial', 'Habilidades digitales + Inteligencia artificial', 'Inclusión laboral', 'Género y diversidad', 'Discapacidad e inclusión', 'Salud y bienestar'],
        'comercializacion': ['Habilidades para emprender', 'Marketing digital', 'Costos y precios', 'Propuesta de valor', 'E-commerce', 'Ventas y atención al cliente'],
        'habilidades-digitales': ['Alfabetización digital', 'Herramientas de oficina (Office)', 'Ciudadanía virtual', 'Navegación segura', 'Gestión de archivos'],
        'ia': ['Inteligencia artificial básica', 'Prompt engineering', 'IA para el empleo', 'Ética y herramientas de IA', 'Automatización de tareas']
    };

    const keywordsByArea = {
        'transversal': ['Innovador', 'Práctico', 'Dinámico', 'Certificable', 'Sostenible', 'Orientado al Empleo', 'Basado en Proyectos', 'Empoderador', 'Accesible'],
        'Inclusión laboral': ['Búsqueda de empleo', 'CV y entrevista', 'Soft skills', 'Derechos laborales'],
        'Marketing digital': ['Redes sociales', 'Ads', 'Contenido creativo', 'SEO'],
        'Prompt engineering': ['Instrucciones claras', 'Iteración', 'Modelos LLM', 'Contexto'],
        'Alfabetización digital': ['Uso de mouse/teclado', 'Internet básico', 'Correo electrónico'],
        'IA para el empleo': ['Productividad', 'Automatización', 'Nuevos perfiles'],
        'Habilidades para emprender': ['Modelo de negocios', 'Marketing digital', 'Costos y precios', 'Propuesta de valor'],
        'Habilidades para aprender': ['Técnicas de estudio', 'Aprendizaje autónomo', 'Gestión del tiempo', 'Metacognición'],
        'Inteligencia artificial': ['Modelos LLM', 'Automatización', 'Productividad', 'Ética y sesgos'],
        'Habilidades digitales + Inteligencia artificial': ['Integración tecnológica', 'Productividad con IA', 'Ética digital', 'Herramientas híbridas']
    };

    const forbiddenTerms = {
        'justicia social': 'Formación ciudadana / Desarrollo profesional',
        'juventudes': 'Población joven / Beneficiarios',
        'lenguaje inclusivo': 'Comunicación accesible / Lenguaje neutro',
        'educación popular': 'Capacitación comunitaria / Educación no formal',
        'educación comunitaria': 'Fortalecimiento territorial / Capacitación local',
        'economía popular': 'Desarrollo socio-productivo / Economía social'
    };

    const ejeBaseSelect = document.getElementById('eje-base');
    const areaTematicaSelect = document.getElementById('area-tematica');
    const keywordContainer = document.getElementById('keyword-container');

    const updateKeywords = (area) => {
        const baseKeywords = keywordsByArea['transversal'];
        const contextualKeywords = keywordsByArea[area] || [];
        const allKeywords = [...baseKeywords, ...contextualKeywords];

        keywordContainer.innerHTML = '';
        allKeywords.forEach(kw => {
            const span = document.createElement('span');
            span.className = 'keyword-tag';
            span.setAttribute('data-value', kw);
            span.textContent = kw;
            span.addEventListener('click', () => {
                span.classList.toggle('active');
            });
            keywordContainer.appendChild(span);
        });
    };

    // Hierarchical Dropdown Logic
    ejeBaseSelect.addEventListener('change', () => {
        const eje = ejeBaseSelect.value;
        areaTematicaSelect.innerHTML = '<option value="">Selecciona un área...</option>';

        if (eje && thematicAreas[eje]) {
            areaTematicaSelect.disabled = false;
            thematicAreas[eje].forEach(area => {
                const option = document.createElement('option');
                option.value = area;
                option.textContent = area;
                areaTematicaSelect.appendChild(option);
            });
            updateKeywords('transversal');
        } else {
            areaTematicaSelect.disabled = true;
            areaTematicaSelect.innerHTML = '<option value="">Primero selecciona un eje...</option>';
            updateKeywords('transversal');
        }
    });

    areaTematicaSelect.addEventListener('change', () => {
        updateKeywords(areaTematicaSelect.value);
    });

    // Initial keyword load
    updateKeywords('transversal');

    // Intention Detection Logic
    const sparkleContainer = document.getElementById('sparkle-suggestion');
    const intensionMap = {
        'ia': 'Inteligencia Artificial (IA)',
        'prompt': 'Inteligencia Artificial (IA)',
        'computadora': 'Habilidades digitales',
        'digital': 'Habilidades digitales',
        'social': 'Promoción humana',
        'género': 'Promoción humana',
        'emprender': 'Comercialización / Habilidades emprendedoras',
        'negocio': 'Comercialización / Habilidades emprendedoras',
        'dinero': 'Comercialización / Habilidades emprendedoras'
    };

    const courseNameInput = document.getElementById('course-name');

    courseNameInput.addEventListener('input', (e) => {
        const val = e.target.value.toLowerCase();
        sparkleContainer.innerHTML = '';

        for (const [key, area] of Object.entries(intensionMap)) {
            if (val.includes(key)) {
                const suggestion = document.createElement('div');
                suggestion.className = 'magic-btn';
                suggestion.style.animation = 'fadeIn 0.5s ease-out';
                suggestion.textContent = `✨ Vincular con ${area}`;
                suggestion.addEventListener('click', () => {
                    const option = Array.from(ejeBaseSelect.options).find(opt => opt.text.includes(area) || area.includes(opt.text));
                    if (option) {
                        ejeBaseSelect.value = option.value;
                        ejeBaseSelect.dispatchEvent(new Event('change'));
                    }
                    suggestion.remove();
                });
                sparkleContainer.appendChild(suggestion);
                break;
            }
        }
        updateHealthScore(); 
        updateComplianceScanner(e.target.value);
    });

    const complianceAlert = document.getElementById('compliance-alert');
    function updateComplianceScanner(text) {
        const val = text.toLowerCase();
        let found = false;
        
        for (const [term, suggestion] of Object.entries(forbiddenTerms)) {
            if (val.includes(term)) {
                complianceAlert.innerHTML = `<i class="fas fa-exclamation-triangle"></i> <strong>Pauta Institucional:</strong> Se sugiere evitar "${term}". <br><span>💡 Probá con: ${suggestion}</span>`;
                complianceAlert.classList.remove('hidden');
                found = true;
                break;
            }
        }
        
        if (!found) {
            complianceAlert.classList.add('hidden');
        }
    }

    // Magic Fill Functionality
    const examples = [
        {
            name: "Introducción a la Inteligencia Artificial",
            audience: "estudiantes",
            eje: "ia",
            area: "Prompt engineering",
            block: "estructura-completa",
            levels: ["Básico", "Intermedio"],
            pedagogy: "práctico y basado en talleres",
            tone: "claro, motivador y cercano",
            keywords: ["Prompt engineering", "Certificable", "Innovador"]
        },
        {
            name: "Habilidades Digitales para el Empleo (ATP)",
            audience: "ATP (Apto para Todo Público)",
            eje: "habilidades-digitales",
            area: "Alfabetización digital",
            block: "bloque-1",
            levels: ["Básico"],
            pedagogy: "vivencial y reflexivo",
            tone: "accesible y dinámico",
            keywords: ["Alfabetización digital", "Orientado al Empleo", "Accesible"]
        }
    ];

    magicFillBtn.addEventListener('click', () => {
        const ex = examples[Math.floor(Math.random() * examples.length)];

        document.getElementById('course-name').value = ex.name;
        document.getElementById('audience').value = ex.audience;
        document.getElementById('eje-base').value = ex.eje;

        // Trigger change to populate areas
        document.getElementById('eje-base').dispatchEvent(new Event('change'));

        setTimeout(() => {
            document.getElementById('area-tematica').value = ex.area;
            document.getElementById('area-tematica').dispatchEvent(new Event('change'));

            document.getElementById('block').value = ex.block;
            document.getElementById('pedagogy').value = ex.pedagogy;
            document.querySelector(`input[name="tone"][value="${ex.tone}"]`).checked = true;

            // Levels
            document.querySelectorAll('input[name="level"]').forEach(cb => {
                cb.checked = ex.levels.includes(cb.value);
            });

            // Keywords
            setTimeout(() => {
                document.querySelectorAll('.keyword-tag').forEach(tag => {
                    if (ex.keywords.includes(tag.textContent)) {
                        tag.classList.add('active');
                    } else {
                        tag.classList.remove('active');
                    }
                });
                updateHealthScore();
                updateComplianceScanner(document.getElementById('course-name').value);
            }, 100);
        }, 50);
    });

    // Initial keyword load
    updateKeywords('transversal');

    // ===== SALUD DEL PROMPT - RADAR CHART LOGIC =====
    const RADAR_AXES = [
        { label: 'Identidad', key: 'nombre' },
        { label: 'Público', key: 'publico' },
        { label: 'Eje Inst.', key: 'eje' },
        { label: 'Área', key: 'area' },
        { label: 'Bloque SD', key: 'bloque' },
        { label: 'Keywords', key: 'keywords' }
    ];

    const CX = 150, CY = 150, MAX_R = 110;

    function polarToCartesian(cx, cy, r, angleRad) {
        return {
            x: cx + r * Math.cos(angleRad),
            y: cy + r * Math.sin(angleRad)
        };
    }

    function initRadar() {
        const axesGroup = document.getElementById('radar-axes');
        const labelsGroup = document.getElementById('radar-labels');
        axesGroup.innerHTML = '';
        labelsGroup.innerHTML = '';

        const n = RADAR_AXES.length;
        RADAR_AXES.forEach((axis, i) => {
            const angle = (Math.PI * 2 * i / n) - Math.PI / 2;
            const end = polarToCartesian(CX, CY, MAX_R, angle);
            const labelPos = polarToCartesian(CX, CY, MAX_R + 22, angle);

            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', CX); line.setAttribute('y1', CY);
            line.setAttribute('x2', end.x); line.setAttribute('y2', end.y);
            line.setAttribute('stroke', 'rgba(255,255,255,0.08)');
            line.setAttribute('stroke-width', '1');
            axesGroup.appendChild(line);

            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', labelPos.x);
            text.setAttribute('y', labelPos.y);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('dominant-baseline', 'middle');
            text.setAttribute('font-size', '10');
            text.setAttribute('fill', '#94a3b8');
            text.setAttribute('font-family', 'Outfit, sans-serif');
            text.textContent = axis.label;
            labelsGroup.appendChild(text);
        });
    }

    function updateRadar(scores) {
        const n = RADAR_AXES.length;
        const pointsGroup = document.getElementById('radar-points');
        const polygon = document.getElementById('radar-polygon');
        pointsGroup.innerHTML = '';

        const pts = RADAR_AXES.map((axis, i) => {
            const angle = (Math.PI * 2 * i / n) - Math.PI / 2;
            const r = MAX_R * (scores[axis.key] || 0);
            return polarToCartesian(CX, CY, r, angle);
        });

        polygon.setAttribute('points', pts.map(p => `${p.x},${p.y}`).join(' '));

        // Animate polygon color by average
        const avg = Object.values(scores).reduce((a, b) => a + b, 0) / n;
        if (avg >= 0.85) {
            polygon.setAttribute('fill', 'rgba(16,185,129,0.2)');
            polygon.setAttribute('stroke', '#10b981');
        } else if (avg >= 0.5) {
            polygon.setAttribute('fill', 'rgba(99,102,241,0.2)');
            polygon.setAttribute('stroke', '#6366f1');
        } else {
            polygon.setAttribute('fill', 'rgba(244,63,94,0.15)');
            polygon.setAttribute('stroke', '#f43f5e');
        }

        pts.forEach((p, i) => {
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', p.x);
            circle.setAttribute('cy', p.y);
            circle.setAttribute('r', 4);
            const score = scores[RADAR_AXES[i].key] || 0;
            circle.setAttribute('fill', score >= 1 ? '#10b981' : score > 0 ? '#6366f1' : 'rgba(255,255,255,0.1)');
            circle.setAttribute('stroke', '#0f172a');
            circle.setAttribute('stroke-width', '1.5');
            pointsGroup.appendChild(circle);
        });
    }

    function updateHealthScore() {
        const courseNameValue = courseNameInput.value.trim();
        const audienceEl = document.getElementById('audience');
        const audienceVal = audienceEl.value;
        const ejeVal = ejeBaseSelect.value;
        const areaVal = areaTematicaSelect.value;
        const blockEl = document.getElementById('block');
        const blockVal = blockEl.value;
        const keywordsCount = document.querySelectorAll('.keyword-tag.active').length;

        const scores = {
            nombre: Math.min(courseNameValue.length / 5, 1), // More sensitive score (max at 5 chars)
            publico: audienceVal ? 1 : 0,
            eje: ejeVal ? 1 : 0,
            area: areaVal && areaVal !== 'Primero selecciona un eje...' ? 1 : 0,
            bloque: blockVal && blockVal !== 'estructura-completa' ? 1 : (blockVal === 'estructura-completa' ? 0.8 : 0),
            keywords: Math.min(keywordsCount / 3, 1)
        };

        updateRadar(scores);

        const total = Math.round((Object.values(scores).reduce((a, b) => a + b, 0) / RADAR_AXES.length) * 100);
        const scoreArc = document.getElementById('score-arc');
        const circumference = 264;

        if (scoreArc) {
            scoreArc.style.strokeDashoffset = circumference - (circumference * total / 100);
            if (total >= 85) {
                scoreArc.style.stroke = '#10b981';
                scoreArc.style.filter = 'drop-shadow(0 0 8px #10b981)';
                document.getElementById('score-status').textContent = 'Excelente';
            } else if (total >= 60) {
                scoreArc.style.stroke = '#6366f1';
                scoreArc.style.filter = 'drop-shadow(0 0 8px #6366f1)';
                document.getElementById('score-status').textContent = 'Bueno';
            } else if (total >= 30) {
                scoreArc.style.stroke = '#f59e0b';
                scoreArc.style.filter = 'drop-shadow(0 0 8px #f59e0b)';
                document.getElementById('score-status').textContent = 'Básico';
            } else {
                scoreArc.style.stroke = '#f43f5e';
                scoreArc.style.filter = 'drop-shadow(0 0 8px #f43f5e)';
                document.getElementById('score-status').textContent = 'Incompleto';
            }
        }

        document.getElementById('score-number').textContent = total + '%';

        // Update metric items Safely
        const getSelectText = (el) => {
            if (!el || el.selectedIndex === -1) return '—';
            const opt = el.options[el.selectedIndex];
            return opt.value ? opt.text : '—';
        };

        const metricMap = [
            { id: 'metric-nombre', val: courseNameValue || '—', score: scores.nombre },
            { id: 'metric-publico', val: getSelectText(audienceEl), score: scores.publico },
            { id: 'metric-eje', val: getSelectText(ejeBaseSelect), score: scores.eje },
            { id: 'metric-area', val: areaVal && areaVal !== 'Primero selecciona un eje...' ? areaVal : '—', score: scores.area },
            { id: 'metric-bloque', val: getSelectText(blockEl), score: scores.bloque },
            { id: 'metric-keywords', val: keywordsCount > 0 ? `${keywordsCount} seleccionadas` : '—', score: scores.keywords }
        ];

        metricMap.forEach(({ id, val, score }) => {
            const el = document.getElementById(id);
            if (!el) return;
            const dot = el.querySelector('.metric-dot');
            const valEl = el.querySelector('.metric-val');

            if (valEl) {
                valEl.textContent = val.length > 20 ? val.substring(0, 20) + '…' : val;
            }

            el.classList.remove('active', 'excellent');
            if (dot) dot.classList.remove('active', 'inactive', 'excellent');

            if (score >= 1) {
                el.classList.add('excellent');
                if (dot) dot.classList.add('excellent');
            } else if (score > 0) {
                el.classList.add('active');
                if (dot) dot.classList.add('active');
            } else {
                if (dot) dot.classList.add('inactive');
            }
        });

        updateLivePreview();
    }

    initRadar();
    updateHealthScore();
    updateLivePreview();

    // Wire up listeners
    document.getElementById('audience').addEventListener('change', updateHealthScore);
    ejeBaseSelect.addEventListener('change', updateHealthScore);
    areaTematicaSelect.addEventListener('change', updateHealthScore);
    document.getElementById('block').addEventListener('change', updateHealthScore);
    document.querySelectorAll('input[name="level"]').forEach(cb => {
        cb.addEventListener('change', updateHealthScore);
    });
    document.getElementById('keyword-container').addEventListener('click', () => setTimeout(updateHealthScore, 50));

    function updateLivePreview() {
        const courseName = document.getElementById('course-name').value.trim() || '[Nombre del Curso]';
        const block = document.getElementById('block').value;
        const objectiveEl = document.getElementById('objective-preview');
        
        const activeLevels = Array.from(document.querySelectorAll('input[name="level"]:checked')).map(cb => cb.value);
        const levelTag = activeLevels.length > 0 ? ` [Nivel: ${activeLevels.join(' + ')}]` : '';

        let previewText = '';
        switch (block) {
            case 'presentacion':
                previewText = `Generar la "Presentación y Guía SD"${levelTag} para el curso "${courseName}".`;
                break;
            case 'bloque-1':
                const isIntermediate = activeLevels.includes('Intermedio');
                previewText = isIntermediate 
                    ? `Desarrollar el "Bloque I: Contenidos" (3 módulos PDF)${levelTag} para el curso "${courseName}".`
                    : `Desarrollar el "Bloque I: Contenidos" (2 módulos PDF - 2500 pal/mód)${levelTag} para el curso "${courseName}".`;
                break;
            case 'bloque-2':
                previewText = `Crear el "Bloque II: Módulo Audiovisual"${levelTag} para el curso "${courseName}".`;
                break;
            case 'evaluacion':
                previewText = `Generar la "Evaluación Integradora"${levelTag} para el curso "${courseName}".`;
                break;
            default:
                previewText = `Generar la Estructura Completa de Secuencia Didáctica (SD)${levelTag} para el curso "${courseName}".`;
        }
        objectiveEl.textContent = previewText;
    }

    // ===== END SALUD DEL PROMPT =====

    const copyGeminiBtn = document.getElementById('copy-gemini-btn');

    generateBtn.addEventListener('click', () => {
        if (isTyping) return;
        const courseName = document.getElementById('course-name').value;
        const audience = document.getElementById('audience').value;
        const ejeBase = ejeBaseSelect.options[ejeBaseSelect.selectedIndex] ? ejeBaseSelect.options[ejeBaseSelect.selectedIndex].text : '';
        const areaTematica = areaTematicaSelect.value;
        const block = document.getElementById('block').value;
        const pedagogy = document.getElementById('pedagogy').value;
        const toneElement = document.querySelector('input[name="tone"]:checked');
        const tone = toneElement ? toneElement.value : 'profesional';

        const activeKeywords = Array.from(document.querySelectorAll('.keyword-tag.active')).map(tag => tag.getAttribute('data-value'));
        const activeLevels = Array.from(document.querySelectorAll('input[name="level"]:checked')).map(cb => cb.value);

        if (!courseName || !audience || ejeBase === 'Selecciona un eje base...' || !areaTematica) {
            alert('Por favor, completa los campos obligatorios: Nombre, Público, Eje y Área.');
            return;
        }

        const isIntermediate = activeLevels.includes('Intermedio');

        let objectiveText = '';
        let stepText = '';
        let knowledgeBaseAddons = '';
        let executionMandates = '';

        if (isIntermediate) {
            // INTERMEDIATE LEVEL STRUCTURE
            switch (block) {
                case 'presentacion':
                    objectiveText = `Generar la "Presentación y Guía SD" (NIVEL INTERMEDIO) para el curso "${courseName}".`;
                    stepText = `1. BIENVENIDA: Máx 100 palabras. Lenguaje claro, NO INCLUSIVO, sencillo, sin modismos. Pronombre "Nosotros". Mencionar recuperación del nivel Básico.\n2. PRESENTACIÓN: Máx 200 palabras. Introducción y desarrollo breve de módulos.\n3. OBJETIVOS: Estructura "Al finalizar este encuentro, serás capaz de...". Usar verbos: Definir, Reconocer, Identificar, Comprender, Valorar.\n4. MAPA CONCEPTUAL: Definir Tema Principal y Subtemas.\n5. CRONOGRAMA: Instrucción para completar plan de trabajo separado.`;
                    break;
                case 'bloque-1':
                    objectiveText = `Desarrollar el "Bloque I: Contenidos" (3 módulos PDF - NIVEL INTERMEDIO) para "${courseName}".`;
                    stepText = `1. Estructura de 3 MÓDULOS específicos.\n2. EXTENSIÓN: Cada módulo debe tener exactamente 2 a 3 PÁGINAS (aprox 1000-1500 palabras).\n3. CONTENIDO: Introducción a la clase (objetivos y recomendaciones), explicación detallada para armado de PDF y materiales de práctica (ejercicios descargables/cuestionarios).\n4. FORMATO: Texto descriptivo para equipo de gráfica (no superar 12 carillas totales).`;
                    break;
                case 'bloque-2':
                    objectiveText = `Crear el "Bloque II: Módulo Audiovisual" (NIVEL INTERMEDIO) para "${courseName}".`;
                    stepText = `1. GUION PARA VIDEO: Puede ser 1 video de 3 MINUTOS o 2 videos de 90 SEGUNDOS.\n2. ESTRUCTURA: Introducción (10s), Presentación (15s), Desarrollo (25s con visuales técnicos), Cierre (10s) y Despedida (5s).\n3. PAUTAS: Lenguaje claro, subtítulos, Arial/Calibri 12, interlineado 1.5.`;
                    break;
                case 'evaluacion':
                    objectiveText = `Generar la "Evaluación Interactiva" (NIVEL INTERMEDIO) para "${courseName}".`;
                    stepText = `1. CUESTIONARIO: 8 a 10 ítems (V/F o Múltiple Choice).\n2. CARÁCTER: Formativa e integradora, basada en "pequeñas pistas" o palabras clave sumatorias. Incluir respuestas correctas y aclaraciones.`;
                    break;
                default:
                    objectiveText = `Generar Estructura Completa de Secuencia Didáctica (INTERMEDIO) para "${courseName}".`;
                    stepText = `1. Bienvenida (100 pal) y Presentación (200 pal).\n2. Bloque I: 3 Módulos PDF (2-3 págs cada uno) con PDF de práctica.\n3. Bloque II: Guion Audiovisual (1 video de 3min o 2 de 90s).\n4. Evaluación (8-10 consignas Choice/VF).\n5. Bibliografía APA 7 (Citas directas e indirectas).`;
            }
            knowledgeBaseAddons = `6. **Bibliografía y Citas**: Obligatorio usar NORMAS APA 7. Incluir lista alfabética al final. Diferenciar citas directas (entre comillas, Autor, Año, p. X) de indirectas/paráfrasis.`;
            executionMandates = `- **EXTENSIÓN INTERMEDIA**: Módulos PDF de 2 a 3 páginas. No exceder 12 carillas totales para el curso.\n- **ESTILO**: Lenguaje NETRAL, NO INCLUSIVO, sin modismos tecnicistas innecesarios.`;
        } else {
            // BASIC LEVEL STRUCTURE (OR DEFAULT)
            switch (block) {
                case 'presentacion':
                    objectiveText = `Generar la "Presentación y Guía SD" para el curso "${courseName}".`;
                    stepText = `1. Bienvenida (a la plataforma y al curso): 1er párrafo con pronombre "VOS", 2do párrafo con "NOSOTROS".\n2. Guía del curso: Nombre (corto, conciso, atractivo), Nivel, Objetivos y Plan de Trabajo.\n3. Referencia al Mapa del Curso (espejo fiel de contenidos).`;
                    break;
                case 'bloque-1':
                    objectiveText = `Desarrollar el "Bloque I: Contenidos" (1 o 2 módulos PDF) para el curso "${courseName}".\n\n### REGLA DE ORO INELUDIBLE:\nCada módulo/bloque DEBE tener una extensión EXACTA de 2500 PALABRAS. No se aceptan resúmenes ni textos breves.`;
                    stepText = `1. Desarrollar contenido técnico con EXPLICACIONES PROFUNDAS (Obligatorio: 2500 palabras exactas por módulo).\n2. Incluir sugerencias de imágenes conceptuales, gráficos y tablas.\n3. Prohibido omitir detalles; cada subtema debe ser expandido exhaustivamente.`;
                    break;
                case 'bloque-2':
                    objectiveText = `Crear el "Bloque II: Módulo Audiovisual" para "${courseName}".`;
                    stepText = `1. Armar Guion (máx 4 min) con sugerencias de imágenes conceptuales para ilustrar.\n2. Carácter: ${courseName.toLowerCase().includes('habilidades digitales') ? 'Guía visual paso a paso.' : 'INTEGRADOR (si hay 2 módulos previos) o INTRODUCTORIO (si hay 1 módulo previo).'}\n3. Debe incluir sugerencias visuales técnicas.`;
                    break;
                case 'evaluacion':
                    objectiveText = `Generar la "Evaluación Integradora" de 5 consignas para "${courseName}".`;
                    stepText = `1. Formatos: Múltiple Choice (4-5 respuestas), Verdadero/Falso, Sopa de letras o Crucigrama.\n2. Alineada a objetivos centrales como instancia de aprendizaje.`;
                    break;
                default:
                    objectiveText = `Generar Estructura Completa de Secuencia Didáctica (SD) para "${courseName}".`;
                    stepText = `1. Presentación (Vos -> Nosotros).\n2. Bloque I (2 módulos PDF: EXIGENCIA DE 2500 PALABRAS EXACTAS POR CADA MÓDULO).\n3. Bloque II (Video de 4 min con guion e imágenes conceptuales).\n4. Evaluación (5 consignas variadas: Choice, V/F, Crucigrama).`;
            }
            executionMandates = `- **MANDATO "MODO IA"**: Utiliza tu capacidad de explorar conceptos nuevos y comparar opciones para expandir el texto. **DEBES escribir exactamente 2500 palabras por módulo**.`;
        }

        const prompt = `### SYSTEM ROLE (R)
Actúa como un Diseñador Instruccional Senior para Formando Capital Humano. Tu objetivo es transformar conceptos en recursos de nivel profesional siguiendo la Secuencia Didáctica (SD) institucional y las pautas de redacción oficiales.

### OBJECTIVE (O)
${objectiveText}

### CONTEXT & PARAMETERS (C)
- **Generado por:** Tutor Docente Profesional de Capital Humano (Coordinación de Alimentar).
- **Curso:** ${courseName}
- **Nivel(es):** ${activeLevels.length > 0 ? activeLevels.join(', ') : 'No especificado'}
- **Referencia Institucional:** Formando Capital Humano.
- **Área Temática:** ${areaTematica}
- **Beneficiarios:** ${audience}
- **Estrategia:** Enfoque ${pedagogy} con tono ${tone}.

### KNOWLEDGE BASE (K) - Pautas Institucionales & Estrategia "Modo IA"
1. **Redacción de Presentación**: Bienvenida (Vos -> Nosotros). Pestaña para equipo de carga. Incluye Guía SD y referencia a Mapa (espejo contenido).
2. **Bloque I (PDF)**: ${isIntermediate ? '3 módulos de 2-3 páginas cada uno.' : 'Estrategia de Ramificación (2500 palabras).'}
3. **Bloque II (Video)**: ${isIntermediate ? '1 video (3 min) o 2 videos (90s).' : 'Guion máx 4 min.'} Guía paso a paso en cursos prácticos. Sugerir imágenes conceptuales.
4. **Evaluación**: ${isIntermediate ? '8 a 10 consignas formats variados.' : '5 consignas (V/F, Choice, Sopa de letras, Crucigrama).'}
5. **Verificación de Datos**: Comprobar información en múltiples fuentes (mínimo 3 sitios). Si hay ambigüedad, priorizar el contexto de Formando Capital Humano.
${knowledgeBaseAddons}
6. **Restricciones Temáticas (EXCLUSIÓN CRÍTICA)**: Queda TERMINANTEMENTE PROHIBIDO incluir referencias, terminología o enfoques relacionados con: Justicia social, Juventudes, Lenguaje inclusivo, Educación popular o Educación comunitaria.

### EXECUTION STEPS (E)
${stepText}
${executionMandates}
- **RESTRICCIÓN DE CONTENIDO**: Ignora y excluye cualquier sesgo o tema vinculado a Justicia social, Juventudes, Lenguaje inclusivo, Educación popular o Educación comunitaria.
- Si el contenido es insuficiente, aplica una nueva rama de búsqueda sobre los subconceptos técnicos detectados.
- El contenido debe estar equilibrado hacia la ${tone}.
- Títulos: N1 (Centrado), N2 (Izquierda), N3 (Izquierda+Cursiva). Negrita y Mayúsculas iniciales.
- Viñetas: Mayúscula inicial y PUNTO FINAL.
- Utilizar lenguaje sencillo, claro y accesible para ${audience}. 1ra persona plural ("Nosotros").
- Definir términos técnicos claramente. Evitar exceso de citas.
${activeKeywords.length > 0 ? '- Integra refuerzos técnicos (Ramas de búsqueda): ' + activeKeywords.join(', ') + '.' : ''}

[VALIDACIÓN DE ALINEACIÓN]
Si "${courseName}" no vincula con "${areaTematica}", marca con [REFERENCIA A MODIFICAR].

### TONE & STYLE (T)
Utiliza un tono ${tone}. Comunicación profesional y motivadora. Recursos sugeridos: Infografías, descargables e imágenes conceptuales.`;

        // Update UI with Sequential Revelation
        const resultActions = document.querySelector('.result-actions');
        const aiActions = document.getElementById('ai-actions');
        const aiLinks = document.getElementById('ai-links');
        const copyContainer = document.getElementById('copy-container');

        resultActions.classList.add('hidden');
        copyContainer.classList.add('hidden');
        aiActions.classList.add('hidden');
        aiLinks.classList.add('hidden');

        typeWriter(prompt, promptOutput, 5, () => {
            resultActions.classList.remove('hidden');
            copyContainer.classList.remove('hidden');
            aiActions.classList.remove('hidden');
            aiLinks.classList.remove('hidden');
            copyBtn.style.animation = 'pulseGlow 2s infinite';
        });

        resultSection.scrollIntoView({ behavior: 'smooth' });
        generateBtn.textContent = '¡Volver a Generar!';
        setTimeout(() => { generateBtn.textContent = 'Generar Prompt Estructurado'; }, 2000);
    });

    const handleCopy = (btn, text, callback) => {
        navigator.clipboard.writeText(text).then(() => {
            const originalText = btn.textContent;
            btn.textContent = '¡Prompt Copiado!';
            const originalBg = btn.style.background;
            btn.style.background = 'rgba(16, 185, 129, 0.4)';

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = originalBg;
                if (callback) callback();
            }, 1000);
        });
    };

    copyBtn.addEventListener('click', () => {
        handleCopy(copyBtn, promptOutput.textContent);
    });

    if (copyGeminiBtn) {
        copyGeminiBtn.addEventListener('click', () => {
            handleCopy(copyGeminiBtn, promptOutput.textContent, () => {
                window.open('https://gemini.google.com', '_blank');
            });
        });
    }

    // Malla Curricular / Mental Map Logic
    const viewMallaBtn = document.getElementById('view-malla-btn');
    const mallaModal = document.getElementById('malla-modal');
    const closeMalla = document.getElementById('close-malla');
    const mallaTree = document.getElementById('malla-tree');

    viewMallaBtn.addEventListener('click', () => {
        const courseName = document.getElementById('course-name').value.trim() || 'Curso Sin Nombre';
        const area = document.getElementById('area-tematica').value;
        const keywords = Array.from(document.querySelectorAll('.keyword-tag.active')).map(tag => tag.textContent);
        
        generateMallaTree(courseName, area, keywords);
        mallaModal.classList.remove('hidden');
    });

    closeMalla.addEventListener('click', () => {
        mallaModal.classList.add('hidden');
    });

    window.addEventListener('click', (e) => {
        if (e.target === mallaModal) mallaModal.classList.add('hidden');
    });

    function generateMallaTree(title, area, keywords) {
        let html = `
            <div class="tree-root">
                <div class="node principal">
                    <i class="fas fa-graduation-cap"></i>
                    <span>${title}</span>
                </div>
                <div class="tree-branches">
        `;

        // Bloque I: Contenidos
        html += `
            <div class="branch">
                <div class="node category">Bloque I: Contenidos Técnicos</div>
                <div class="node-children">
        `;
        
        const subtopics = [...keywords];
        if (subtopics.length === 0) subtopics.push('Fundamentos de ' + area, 'Aplicaciones Prácticas');
        
        subtopics.forEach(topic => {
            html += `<div class="node leaf">${topic}</div>`;
        });
        
        html += `</div></div>`;

        // Bloque II: Audiovisual
        html += `
            <div class="branch">
                <div class="node category">Bloque II: Audiovisual</div>
                <div class="node-children">
                    <div class="node leaf">Video Tutorial / Integrador</div>
                    <div class="node leaf">Guion Técnico</div>
                </div>
            </div>
        `;

        // Evaluación
        html += `
            <div class="branch">
                <div class="node category">Evaluación final</div>
                <div class="node-children">
                    <div class="node leaf">Cuestionario de Desempeño</div>
                </div>
            </div>
        `;

        html += `</div></div>`;
        mallaTree.innerHTML = html;
    }

    // Initial Dashboard Sync
    updateHealthScore();

});
