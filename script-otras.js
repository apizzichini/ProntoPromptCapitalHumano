document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('rocket-app-container');

    // ==========================================
    // CONFIGURACIÓN Y CONSTANTES
    // ==========================================
    const SECUENCIA_MODELO = `1. PORTADA E IDENTIFICACIÓN: Nombre del curso, Institución, Modalidad y Carga horaria.
2. FUNDAMENTACIÓN Y PROPÓSITO: Justificación pedagógica basada en evidencia y competencias a desarrollar.
3. OBJETIVOS: Un objetivo general claro y al menos 5 específicos medibles (Taxonomía de Bloom).
4. PERFIL DEL DESTINATARIO: Descripción de la audiencia específica y su perfil de egreso.
5. CONTENIDOS MODULARES: Desarrollo exhaustivo de cada unidad, con actividades prácticas de aplicación real.
6. MAPA CONCEPTUAL: Estructura lógica y visual de las conexiones entre temas.
7. METODOLOGÍA: Enfoque pedagógico activo y estrategias de enseñanza-aprendizaje.
8. CRONOGRAMA SUGERIDO: Planificación temporal por módulos e hitos de aprendizaje.
9. SISTEMA DE EVALUACIÓN: Criterios claros, instrumentos (diagnóstica, formativa y sumativa) y rúbricas.
10. GUIÓN DE VIDEO INTRODUCTORIO: Narrativa para la presentación del curso y motivación del alumno.
11. BIBLIOGRAFÍA Y RECURSOS: Fuentes curadas en formato APA 7 y herramientas digitales sugeridas.`;

    const PROMPT_ANALISIS_PASO_1 = `### PASO 1: EXTRACCIÓN Y MAPEO PEDAGÓGICO (PARA NOTEBOOKLM) ###

[ROLE]: Actúa como Analista Senior de Diseño Instruccional del Ministerio de Capital Humano.

[OBJETIVO]: Realizar un ANÁLISIS DE CRUCE (Triangulación) técnico y pedagógico de alta granularidad entre tres ejes: el Contenido Fuente, el Protocolo Institucional y la Secuencia Didáctica Modelo.

[INSTRUCCIONES DE EJECUCIÓN CRÍTICAS]:
1. **AUDITORÍA DE NIVEL Y EXTENSIÓN**: Antes de extraer, analiza el volumen y complejidad del contenido original. Determina si, basándose en la densidad técnica, el curso debe categorizarse como NIVEL BÁSICO, INTERMEDIO o AVANZADO de "Formando Capital Humano". Proyecta la transposición para mantener la fidelidad total a la extensión original (traslada toda la carga técnica sin pérdidas).
2. **IDENTIFICACIÓN DE NÚCLEOS (TRIANGULACIÓN)**: Cruza el material original con el "Protocolo de Transposición" para seleccionar lo relevante. Mapea inmediatamente cada nodo dentro de los BLOQUES y MÓDULOS de la "Secuencia Didáctica Modelo" (11 puntos). Es fundamental que el informe respete la jerarquía exacta de la secuencia modelo para lograr una estructura perfecta.
3. **FILTRADO PROFESIONAL Y SOBERANÍA**: Aplica los criterios del "Protocolo de Transposición". Asegura la alineación con la Soberanía Tecnológica nacional y la pertinencia laboral del nivel detectado.
4. **MAPEO ESTRUCTURAL DE ALTA RESOLUCIÓN**: Distribuye CADA NODO extraído:
   - FASE DE INICIO: Disparadores, sensibilización y saberes previos.
   - FASE DE DESARROLLO: Contenido núcleo, profundidad teórica y nodos de práctica técnica detallada.
   - FASE DE CIERRE: Evaluación de competencias e integración laboral.

[DETALLES DE SALIDA]:
- Genera un **Informe Técnico de Estructura de Alta Resolución** que incluya la **Categorización de Nivel** detectada.
- NO REDACTES EL CURSO.
- Formato: Listas jerárquicas vinculadas directamente a los módulos de la secuencia modelo.`;

    // ==========================================
    // FUNCIONES DE UTILIDAD
    // ==========================================
    const typeWriter = (text, element, speed = 2, callback = null) => {
        element.textContent = '';
        element.classList.add('typing');
        let i = 0;
        function type() {
            if (i < text.length) {
                element.textContent += text.substring(i, i + 5);
                i += 5;
                setTimeout(type, speed);
                element.scrollTop = element.scrollHeight;
            } else {
                element.classList.remove('typing');
                if (callback) callback();
            }
        }
        type();
    };

    const copyToClipboard = (text, btn) => {
        navigator.clipboard.writeText(text).then(() => {
            const original = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> ¡Copiado!';
            btn.classList.add('copied');
            setTimeout(() => {
                btn.innerHTML = original;
                btn.classList.remove('copied');
            }, 2000);
        });
    };

    // ==========================================
    // RENDERIZADO DEL WORKFLOW (3 PASOS)
    // ==========================================
    function renderWorkflow() {
        appContainer.innerHTML = `
            <!-- Workflow Visual Navigation -->
            <!-- Workflow Visual Navigation -->
            <div class="nlm-workflow-banner" style="margin-bottom: 2.5rem;">
                <div class="nlm-workflow-steps">
                    <div class="nlm-step" id="step-indicator-1">
                        <div class="nlm-step-icon"><i class="fas fa-search"></i></div>
                        <div class="nlm-step-label">Paso 1</div>
                        <div class="nlm-step-desc">Extracción de Núcleos</div>
                    </div>
                    <div class="nlm-step-connector"><i class="fas fa-chevron-right"></i></div>
                    <div class="nlm-step" id="step-indicator-2">
                        <div class="nlm-step-icon"><i class="fas fa-sync-alt"></i></div>
                        <div class="nlm-step-label">Paso 2</div>
                        <div class="nlm-step-desc">Adaptación Metaprompt</div>
                    </div>
                    <div class="nlm-step-connector"><i class="fas fa-chevron-right"></i></div>
                    <div class="nlm-step" id="step-indicator-3">
                        <div class="nlm-step-icon"><i class="fas fa-graduation-cap"></i></div>
                        <div class="nlm-step-label">Paso 3</div>
                        <div class="nlm-step-desc">Generación Final</div>
                    </div>
                </div>
            </div>

            <!-- PASO 1: CONTENEDOR -->
            <div id="step-1-card" class="form-card active">
                <div class="section-header-main" style="border:none; padding:0; margin-bottom:1.5rem;">
                    <h3><i class="fas fa-microchip"></i> Paso 1: Mapeo Pedagógico (Cursos Externos)</h3>
                    <p class="subtitle" style="font-size:0.9rem;">Copia este prompt para extraer la base técnica de tus archivos mediante NotebookLM.</p>
                </div>
                <div class="prompt-output nlm-prompt-output" id="output-step-1" style="min-height: 150px; background: rgba(0,0,0,0.2); border: 1px solid var(--accent-light);"></div>
                <div class="nlm-copy-row" style="margin-top: 1.5rem; justify-content: flex-start;">
                    <button id="copy-step-1-btn" class="primary-btn secondary nlm-copy-btn"><i class="fas fa-copy"></i> Copiar Prompt de Análisis</button>
                    <a href="https://notebooklm.google.com/notebook/0d689222-c831-4e67-b91a-a63d68122821/preview" target="_blank" class="primary-btn nlm-open-btn"><i class="fas fa-external-link-alt"></i> Abrir NotebookLM</a>
                    <button id="next-to-step-2" class="primary-btn nlm-primary-btn" style="margin-left: auto;">Ya tengo el análisis <i class="fas fa-arrow-right"></i></button>
                </div>

            </div>

            <!-- PASO 2: CONTENEDOR (Oculto al inicio) -->
            <div id="step-2-card" class="form-card hidden">
                <div class="section-header-main" style="border:none; padding:0; margin-bottom:1.5rem;">
                    <h3><i class="fas fa-external-link-alt"></i> Paso 2: Transposición (Otros Espacios MCH)</h3>
                    <p class="subtitle" style="font-size:0.9rem;">Pega aquí el <strong>Informe Técnico de Estructura</strong> que te dio NotebookLM para su transposición final.</p>
                </div>
                
                <div class="input-group full-width" style="margin-bottom:1.5rem;">
                    <label><i class="fas fa-brain"></i> Informe Técnico de Estructura (Pegar aquí)</label>
                    <textarea id="analysis-input" rows="8" placeholder="Pega aquí el reporte detallado que generó NotebookLM..."></textarea>
                </div>

                <div class="input-group full-width" style="margin-bottom:2rem;">
                    <label><i class="fas fa-scroll"></i> Secuencia Didáctica Modelo (Fija)</label>
                    <textarea readonly id="model-display" rows="6" style="background-color: rgba(255,255,255,0.05); font-size:0.85rem;"></textarea>
                </div>

                <div style="display: flex; gap: 1rem;">
                    <button id="back-to-step-1" class="primary-btn secondary"><i class="fas fa-arrow-left"></i> Atrás</button>
                    <button id="generate-maestro-btn" class="primary-btn large nlm-primary-btn" style="flex:1;">
                        <i class="fas fa-sync-alt"></i> Adaptar y Generar Prompt Maestro
                    </button>
                </div>
            </div>

            <!-- PASO 3: RESULTADO FINAL -->
            <section id="step-3-card" class="result-card nlm-result-card hidden" style="margin-top: 2rem;">
                <div class="nlm-prompt-header">
                    <div class="nlm-prompt-number"><i class="fas fa-bolt"></i></div>
                    <div>
                        <h4>Prompt Maestro de Generación (Paso 3)</h4>
                        <p>Copia el prompt y úsalo en tu IA preferida para generar el curso completo:</p>
                    </div>
                </div>
                
                <div class="prompt-output nlm-prompt-output" id="output-step-3"></div>
                
                <div class="nlm-copy-row">
                    <button id="copy-step-3-btn" class="primary-btn nlm-primary-btn" style="flex:1;"><i class="fas fa-copy"></i> Copiar Prompt Maestro</button>
                    <button id="restart-btn" class="primary-btn secondary" style="border: 1px dashed var(--accent);"><i class="fas fa-undo"></i> Iniciar Nuevo</button>
                </div>

                <div class="ai-links">
                    <p class="copy-instruction" style="text-align: left; margin-bottom: 1rem; font-size: 0.85rem; color: var(--text-muted);">Accesos rápidos a Modelos de IA:</p>
                    <div class="links-grid">
                        <a href="https://chatgpt.com" target="_blank" class="ai-link-btn gpt">ChatGPT</a>
                        <a href="https://claude.ai" target="_blank" class="ai-link-btn claude">Claude</a>
                        <a href="https://perplexity.ai" target="_blank" class="ai-link-btn perplexity">Perplexity</a>
                        <a href="https://chatgpt.com/g/g-68b1ee82a1b481918c46ce0a2b0123aa-edugpt" target="_blank" class="ai-link-btn gpt-edu"><i class="fas fa-graduation-cap"></i> GPT EDU</a>
                    </div>
                </div>
            </section>
        `;

        // Inicializar Interacciones
        initWorkflowLogic();
    }

    function initWorkflowLogic() {
        // Elementos UI
        const step1Output = document.getElementById('output-step-1');
        const nextBtn = document.getElementById('next-to-step-2');
        const backBtn = document.getElementById('back-to-step-1');
        const generateBtn = document.getElementById('generate-maestro-btn');
        const copy1Btn = document.getElementById('copy-step-1-btn');
        const copy3Btn = document.getElementById('copy-step-3-btn');
        const restartBtn = document.getElementById('restart-btn');
        
        const card1 = document.getElementById('step-1-card');
        const card2 = document.getElementById('step-2-card');
        const card3 = document.getElementById('step-3-card');

        const indicator1 = document.getElementById('step-indicator-1');
        const indicator2 = document.getElementById('step-indicator-2');
        const indicator3 = document.getElementById('step-indicator-3');

        const modelDisplay = document.getElementById('model-display');
        modelDisplay.value = SECUENCIA_MODELO;

        // Mostrar Paso 1
        indicator1.classList.add('active');
        typeWriter(PROMPT_ANALISIS_PASO_1, step1Output);

        // Eventos
        copy1Btn.addEventListener('click', () => copyToClipboard(PROMPT_ANALISIS_PASO_1, copy1Btn));

        nextBtn.addEventListener('click', () => {
            card1.classList.add('hidden');
            card1.classList.remove('active');
            card2.classList.remove('hidden');
            card2.classList.add('active');
            
            indicator1.classList.replace('active', 'completed');
            indicator2.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        backBtn.addEventListener('click', () => {
            card2.classList.add('hidden');
            card2.classList.remove('active');
            card1.classList.remove('hidden');
            card1.classList.add('active');

            indicator2.classList.remove('active');
            indicator1.classList.replace('completed', 'active');
        });

        generateBtn.addEventListener('click', () => {
            const analysis = document.getElementById('analysis-input').value.trim();
            if (!analysis) {
                alert('Por favor, pega el Informe Técnico de Estructura para continuar.');
                return;
            }

            const promptMaestro = `### SISTEMA DE CURSOS EXTERNOS: GENERACIÓN DE CONTENIDOS MCH ###

[ROLE]: Arquitecto de Transposición - Ministerio de Capital Humano.

[OBJETIVO]: Ejecutar la TRANSICIÓN PEDAGÓGICA de contenidos externos para ser integrados en los espacios formativos del MCH.

[INSUMO: INFORME TÉCNICO DE ESTRUCTURA]:
"""
${analysis}
"""

[SECUENCIA DIDÁCTICA MODELO]:
"""
${SECUENCIA_MODELO}
"""

[INSTRUCCIONES DE INGENIERÍA DE ALTO IMPACTO]:
1. **TRANSFORMACIÓN PROFUNDA**: Toma el "Informe Técnico de Estructura" y realiza la mediación pedagógica siguiendo el protocolo institucional.
2. **HIPER-EXTENSIÓN POR MÓDULO**: Redacta el contenido completo de la secuencia didáctica. **CRÍTICO / MANDATORIO**: Cada módulo de la fase de DESARROLLO debe ser hiper-extenso y exhaustivo. Aspira a la máxima longitud que permita la ventana de salida (objetivo de **5000 palabras por módulo**). Desarrolla cada concepto hasta sus últimas consecuencias, incluye múltiples ejemplos, análisis de casos, fundamentos teóricos y guías paso a paso. No aceptaré resúmenes ni síntesis; requiero el desarrollo más voluminoso y profundo posible.
3. **SOBERANÍA TECNOLÓGICA**: Asegura que cada fase (Inicio, Desarrollo, Cierre) tenga una actividad práctica alineada a la Soberanía Tecnológica y formación laboral.
4. **RIGOR DOCENTE**: El tono debe ser profesional, docente y orientado a resultados de inserción laboral real.

[ESTRUCTURA DE CIERRE Y MEJORA CONTINUA]:
Al finalizar la generación del curso completo, DEBES incluir obligatoriamente una sección titulada:
"### ✨ FEEDBACK Y OPTIMIZACIÓN DEL PROMPTING"
En esta sección, pregúntame directamente: "¿En qué área específica te gustaría profundizar ahora?" o "¿Qué parte de la secuencia didáctica consideras que requiere un desarrollo aún más exhaustivo para enriquecer tu práctica docente?". Sugiere 3 caminos específicos para mejorar el resultado actual.

[SALIDA]: Generar el curso completo en formato Markdown profesional.`;

            card3.classList.remove('hidden');
            indicator2.classList.replace('active', 'completed');
            indicator3.classList.add('active');

            typeWriter(promptMaestro, document.getElementById('output-step-3'), 3, () => {
                document.getElementById('output-step-3').scrollIntoView({ behavior: 'smooth' });
            });
        });

        copy3Btn.addEventListener('click', () => {
            const text = document.getElementById('output-step-3').textContent;
            copyToClipboard(text, copy3Btn);
        });

        restartBtn.addEventListener('click', () => {
            renderWorkflow();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Iniciar
    renderWorkflow();
});
